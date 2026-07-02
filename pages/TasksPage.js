class TasksPage {
  constructor(page) {
    this.page = page;
    this.titleInput = page.getByTestId('task-title');
    this.descriptionInput = page.getByTestId('task-description');
    this.submitButton = page.getByTestId('task-submit');
    this.message = page.getByTestId('task-message');
  }

  async createTask(title, description) {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.submitButton.click();
  }
}

module.exports = { TasksPage };
