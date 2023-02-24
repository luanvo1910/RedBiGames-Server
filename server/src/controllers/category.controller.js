const Category = require('../models/category.model');

class CategoryController {
    index(req, res, next) {
        Category.find({})
        .then(categories => res.json({success: true, categories}))
        .catch(err => next(err));
    }

    create(req, res, next) {
        const category = new Category(req.body);
        category.save()
        .then(category => {
            console.log('req.body:',req.body);
            res.status(200).json('added successfully');
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
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

            res.json({success: true, message: 'Category updated successfully'})

        }
        catch (error){
            console.log(error)
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

    async delete (req, res) {
        try {
            const deleteCondition = {_id: req.params.id, user: req.userId}
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