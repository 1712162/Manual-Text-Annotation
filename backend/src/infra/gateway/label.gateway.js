class LabelGateway {
  constructor({ LabelModel, DocumentModel, labelMapper }) {
    this.LabelModel = LabelModel;
    this.DocumentModel = DocumentModel
    this.labelMapper = labelMapper
  }


  async findById(id) {
    const label = await this.LabelModel.findOne({ _id: id })
    return this.labelMapper.toEntity(label)
  }

  async create(entity) {
    const dbItem = this.labelMapper.toDatabase(entity)
    const label = await this.LabelModel.insertMany(dbItem);
    return label.map(this.labelMapper.toEntity)
  }


  async delete(entity) {
    const result = await this.LabelModel.deleteOne({ _id: entity.id });
    const content = entity.content
    if (result.deletedCount) {

      await this.DocumentModel.updateMany({}, {$pull: { labels: { content } } } )
    }
    // eslint-disable-next-line eqeqeq
    return result.deletedCount == 1;
  }


  async edit(id, entity) {
    const dbItem = this.labelMapper.toDatabase(entity)
    await this.LabelModel.updateOne({ _id: id }, dbItem);
    // eslint-disable-next-line prefer-const
    let label = await this.findById(id)
    label.id = label.id.toString()
    const query = {
      labels: {
        $elemMatch: {
          id: label.id,
        },
      },
    }
    await this.DocumentModel.updateMany(query, { $set: { 'labels.$': label } })
    return label
  }


  async list(project_id) {
    const labels = await this.LabelModel.find({ project_id });
    return labels.map(this.labelMapper.toEntity)
  }
}

module.exports = LabelGateway;
