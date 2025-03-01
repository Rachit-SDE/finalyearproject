import Bus from '../models/busModel.js';



const addBus = async (req, res) => {
    const {busnumber, busname, bustype, totalseats, availableseats, price, source, destination, arivaltime, departuretime, stops } = req.body;
    let date = req.body.date;   
    const newdate = new Date(date);
    console.log(newdate);
    try {
        const exists = await Bus.findOne({ busnumber: busnumber });
      if (exists) {
        return res.json({ success: false, message: "Bus already exists" });
      }
      const newBus = new Bus({
        busnumber: busnumber,
        busname: busname,
        bustype: bustype,
        totalseats: totalseats,
        availableseats: availableseats,
        price: price,
        source: source,
        destination: destination,
        arivaltime: arivaltime,
        departuretime: departuretime,
        date: newdate,
        stops: stops,
      });

      await newBus.save();
      res.send({ success: true, message: "bus Added successfully" });
  
    } catch (error) {
        res.json({ success: false, message: error.message });
        
    }
}


const listBus = async (req, res) => {
    try {
        const busData = await Bus.find();
        res.json({ success: true, busData });
    } catch (error) {
        res.json({ success: false, message: error.message });  
    }
    
}

const removeBus = async (req, res) => {
    try {
        const deletedBus = await Bus.findByIdAndDelete(req.params.id);
        if (!deletedBus) {
            return res.status(404).json({ message: 'Bus not found' });
        }
        res.json({ message: 'Bus deleted successfully', deletedBus });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting bus', error });
    }
}
/* UPDATE BUS */
const updateBus = async (req, res) => {
    try {
        const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'Bus updated successfully', updatedBus });
    } catch (error) {
        res.status(500).json({ message: 'Error updating bus', error });
    }
}

const getBusById = async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id);
        return res.status(200).send({success: true, message: 'Bus', bus});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}



export {addBus, listBus, removeBus, updateBus, getBusById}