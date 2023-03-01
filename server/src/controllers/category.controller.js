const Category = require('../models/category.model');

class CategoryController {
    index(req, res, next) {
        Category.find({})
        .then(categories => res.json({success: true, categories}))
        .catch(err => next(err));
    }

    async create(req, res, next) {
        const {category} = req.body;
        const Checkcategory = await Category.findOne({category});
        if (Checkcategory) {
            return res
				.status(400)
				.json({ success: false, message: 'Category has already exits' })
        }
        try {
            const newCategory = new Category({
                category
            })
            await newCategory.save()

            res.json({ success: true, message: 'Category created successfully', category: newCategory})
        } catch (error) {
            console.log(error)
		    res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    async update (req,res, next) {
        const {category} = req.body

        if(!category)
        return res.status(400).json({success: false, message:'error'})

        try{
            let updatedCategory = {
                category: category || 'Unnamed'
            }
            const categoryUpdateCondition = {_id: req.params._id, user: req.userId}

            updatedCategory = await Category.findOneAndUpdate(categoryUpdateCondition, updatedCategory, {new: true})

            if(!updatedCategory)
            return res.status(401).json({success: false, message: 'Category not found or user not authorised'})

            res.json({success: true, message: 'Category updated successfully', category: updatedCategory})

        }
        catch (error){
            console.log(error)
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

    async delete (req, res) {
        try {
            const deleteCondition = {_id: req.params._id, user: req.userId}
            const deletedCategory = await Category.findOneAndDelete(deleteCondition)

            if(!deletedCategory)
            return res.status(401).json({success: false, message: 'Category not found'})

            res.json({success: true, message: 'Category deleted successfully'})
        }catch(error) {
            console.log(error)
            res.status(404).json({success: false, message: 'Internal Server Error'})
        }
    }
}

module.exports = new CategoryController;