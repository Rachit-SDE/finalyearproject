import Bus from "../models/busModel.js";
import axios from 'axios'

// Optimized searchResult function
const searchResult = async (req, res) => {
  let { source, destination } = req.query;
  
  destination = destination.charAt(0).toUpperCase() + destination.slice(1);


  try {
    console.log(source, destination);
    // Ensure date is a valid Date object

    // First, search for direct trips with matching source and destination (case-insensitive)
    let trips = await Bus.find({
      source: { $regex: new RegExp(`^${source}$`, 'i') }, // Case-insensitive match for source
      destination: { $regex: new RegExp(`^${destination}$`, 'i') }, // Case-insensitive match for destination
    });
    console.log(trips);

    if (trips.length === 0) {
      // If no direct match, search in the stops array for source and destination (case-insensitive)
      trips = await Bus.find({
        $and: [
          { 'source': { $regex: new RegExp(`^${source}$`, 'i') } }, // Case-insensitive match for source
          { 'stops.name': { $regex: new RegExp(`^${destination}$`, 'i') } }, // Case-insensitive match for destination
        ]
      });
    }
    if (trips.length === 0) {
      // If no direct match, search in the stops array for source and destination (case-insensitive)
      trips = await Bus.find({
        $and: [
          { 'stops.name': { $regex: new RegExp(`^${source}$`, 'i') } }, // Case-insensitive match for source
          { 'destination': { $regex: new RegExp(`^${destination}$`, 'i') } }, // Case-insensitive match for destination
        ]
      });
    }
    if (trips.length === 0) {
      // If no direct match, search in the stops array for either source or destination
      trips = await Bus.aggregate([
        {
          $match: {
            'stops.name': { $regex: new RegExp(`^${source}$`, 'i') }, // Case-insensitive match for source
            'stops.name': { $regex: new RegExp(`^${destination}$`, 'i') }, // Case-insensitive match for destination
          }
        },
        {
          $addFields: {
            sourceIndex: { $indexOfArray: ['$stops.name', source] }, // Get index of source
            destinationIndex: { $indexOfArray: ['$stops.name', destination] } // Get index of destination
          }
        },
        {
          $match: {
            $expr: { $lt: ['$sourceIndex', '$destinationIndex'] } // Ensure source appears before destination
          }
        }
      ]);
    }
    if (trips.length > 0) {
      res.json(trips); // Return found trips
    } else {
      res.json({ message: 'No trips found' }); // Return no trips found
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Optimized filterResult function
const filterResult = async (req, res) => {
    const { bustype, busname, price, departuretime, source, destination } = req.query;

    const query = {};
    
  if (bustype) {
      query.bustype = { $in: bustype.split(',').map(b => new RegExp(b, 'i')) }; // Case-insensitive bus types
  }
  if (busname) {
      query.busname = { $in: busname.split(',').map(b => new RegExp(b, 'i')) }; // Case-insensitive bus names
  }
  if (price) {
      const [minPrice, maxPrice] = price.split('-').map(Number);
      query.price = { $gte: minPrice, $lte: maxPrice }; // Price range remains unaffected
  }
  
  if (source) {
      query.source = { $in: source.split(',').map(s => new RegExp(s, 'i')) }; // Case-insensitive sources
  }
  if (destination) {
      query.destination = { $in: destination.split(',').map(d => new RegExp(d, 'i')) }; // Case-insensitive destinations
  }
    
  if (departuretime) {
    query.departuretime = { $in: departuretime.split(',').map(d => new RegExp(d, 'i')) }; // Exact match for departure time
  }

    console.log(query);

    try {
        const filteredBuses = await Bus.find(query);
        if (filteredBuses.length > 0) {
          res.json({ buses: filteredBuses });
        }
        else{
          res.json({ message: 'No buses found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const Direction = async (req, res ) => {
  const { origin, destination} = req.body;

  const MAPTILER_API_KEY = 'DXxHR0AZdnMeunClvPSj';

  const mapTilerUrl = `https://api.maptiler.com/route?origin=${origin}&destination=${destination}&key=${MAPTILER_API_KEY}`;

  try {
    const response = await axios.get(mapTilerUrl);
    const data = response.data;

    // Extract relevant data (Route, Distance, Time)
    const route = data.routes[0].geometry.coordinates;
    const distance = data.routes[0].distance; // In meters
    const duration = data.routes[0].duration; // In seconds

    // Convert to kilometers and hours for easier readability
    const distanceKm = (distance / 1000).toFixed(2);
    const durationHrs = (duration / 3600).toFixed(2);

    res.json({
      route,
      distance: `${distanceKm} km`,
      duration: `${durationHrs} hrs`,
    });
  } catch (error) {
    console.error('Error fetching route from MapTiler:', error);
    res.status(500).send('Error fetching route data', error);
  }

}

const captainLogout = async(req, res) => {
  const { busnumber } = req.body;
  console.log(busnumber);
  try {
    const response = await Bus.findOneAndUpdate({busnumber:busnumber})
    console.log(response)
    response.status = 'inactive'
    response.location = ['00.0000','00.0000'];
    await response.save()
    console.log(response);
    
    if (!response) {
      return res.json({ success: false, message: "Bus Not Exist" });
    }
    res.json({ success: true, message: "Caption Logout Successfully", response});
  } catch (error) {
    res.json({success: false, error})
  }
}
const captainLogin = async(req, res) => {
  const { busnumber, longitude, latitude } = req.body;
  try {
    console.log(busnumber, longitude, latitude);
    console.log()
    console.log()
    const response = await Bus.findOne({ busnumber: busnumber });
    console.log(response);
    if(!response){
      res.json({success: false, error});
    }
    response.status = 'active'
    response.location = [latitude,longitude];
    await response.save();
    console.log(response);
    res.json({success: true, message: "location update", response})
  } catch (error) {
    res.json({success: false, message: error.message});
    console.log("error")
  }
}

const updateLocation = async(req, res) => {
  const { busnumber, longitude, latitude } = req.body;
  try {
    console.log(busnumber, longitude, latitude);
    const response = await Bus.findOne({ busnumber: busnumber });
    if(!response){
      res.json({success: false, error});
    }
    response.location = [latitude,longitude];
    await response.save();
    res.json({success: true, message: "location update", response})
  } catch (error) {
    res.json({success: false, message: error.message});
    console.log("error")
  }
}

export { searchResult, filterResult, Direction, captainLogin, captainLogout, updateLocation };
