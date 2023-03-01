const Brand = require('../models/brand.model');

class BrandController {
    index(req, res, next) {
        Brand.find({})
        .then(brands => res.json({success: true, brands}))
        .catch(err => next(err));
    }

    async create(req, res, next) {
        const {name} = req.body;
        const brand = await Brand.findOne({name});
        if (brand) {
            return res
				.status(400)
				.json({ success: false, message: 'Brand has already exits' })
        }
        try {
            const newBrand = new Brand({
                name
            })
            await newBrand.save()

            res.json({ success: true, message: 'Brand created successfully', brand: newBrand})
        } catch (error) {
            console.log(error)
		    res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    async update (req,res, next) {
        const {name} = req.body

        if(!name)
        return res.status(400).json({success: false, message:'error'})

        try{
            let updatedBrand = {
                name: name || 'Unnamed'
            }
            const brandUpdateCondition = {_id: req.params._id, user: req.userId}

            updatedBrand = await Brand.findOneAndUpdate(brandUpdateCondition, updatedBrand, {new: true})

            if(!updatedBrand)
            return res.status(401).json({success: false, message: 'Brand not found or user not authorised'})

            res.json({success: true, message: 'Brand updated successfully', brand: updatedBrand})

        }
        catch (error){
            console.log(error)
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

    async delete (req, res) {
        try {
            const deleteCondition = {_id: req.params._id, user: req.userId}
            const deletedBrand = await Brand.findOneAndDelete(deleteCondition)

            if(!deletedBrand)
            return res.status(401).json({success: false, message: 'Brand not found'})

            res.json({success: true, message: 'Brand deleted successfully'})
        }catch(error) {
            console.log(error)
            res.status(404).json({success: false, message: 'Internal Server Error'})
        }
    }

}

module.exports = new BrandController;