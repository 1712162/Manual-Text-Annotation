const exportData = require('../../application/usecase/dataset-management/export.usecase')

class DatasetController {
  constructor({ importDataset, listDocument, editDocument, deleteDocument, getDocument,
    verifyDocument, annotateDocument, exportDataset, getAllDocument, getDocumentByUserId }) {
    this.importDataset = importDataset
    this.listDocument = listDocument
    this.editDocument = editDocument
    this.getDocument = getDocument
    this.deleteDocument = deleteDocument
    this.verifyDocument = verifyDocument
    this.annotateDocument = annotateDocument
    this.exportDataset = exportDataset
    this.getAllDocument = getAllDocument
    this.getDocumentByUserId = getDocumentByUserId

    this.importData = this.importData.bind(this)
    this.exportData = this.exportData.bind(this)
    this.list = this.list.bind(this)
    this.edit = this.edit.bind(this)
    this.get = this.get.bind(this)
    this.delete = this.delete.bind(this)
    this.verify = this.verify.bind(this)
    this.annotate = this.annotate.bind(this)
    this.getAll = this.getAll.bind(this)
    this.getDocsByUserId = this.getDocsByUserId.bind(this)
  }


  // eslint-disable-next-line consistent-return
  async importData(req, res) {
    const project_id = req.params.id
    const { file } = req
    if (req.fileValidationError) {
      return res.status(400).json({ message: req.fileValidationError })
    }
    const filename = file.originalname
    const fileType = filename.split('.').pop()
    const result = await this.importDataset.execute(project_id, file, fileType);
    try {
      if ( result != 0 && !result) throw Error('Failed to import file.Check out your file')
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async exportData(req, res) {
    const project_id = req.params.id
    const {fileType} = req.body
    const result = await this.exportDataset.execute(project_id,fileType);
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  

  async get(req, res) {
    const project_id = req.params.id
    const result = await this.getDocument.execute(project_id);
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getDocsByUserId(req,res){
    const project_id = req.params.id
    const {userId,maxDocs} = req.body
    const result = await this.getDocumentByUserId.execute(project_id,userId,maxDocs);
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getAll(req,res){
    const project_id = req.params.id
    const result = await this.getAllDocument.execute(project_id);
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async list(req, res) {
    const project_id = req.params.id
    const { page, perPage, sortKey, trend,searchKey} = req.body
    const result = await this.listDocument.execute(project_id, page, perPage, sortKey, trend,searchKey)
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }


  async edit(req, res) {
    const { id } = req.params
    const { content } = req.body
    const result = await this.editDocument.execute(id, content)
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async delete(req, res) {
    const { id } = req.params
    const result = await this.deleteDocument.execute(id)
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async verify(req, res) {
    const { id } = req.params
    const { status } = req.body
    const result = await this.verifyDocument.execute(id, status)
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async annotate(req, res) {
    const { id } = req.params
    const { labels, user_id, admin_id, status} = req.body
    const result = await this.annotateDocument.execute(id, labels, user_id, admin_id, status)
    try {
      if (!result) throw new Error('Your annotation will not be saved because document has been labeled before')
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = DatasetController
