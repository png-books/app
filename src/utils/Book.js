class Book {
  constructor(work) {
    this.author = work.best_book.author;
    this.getAuthorId = this.getAuthorId.bind(this);
  }

  getAuthorId() {
    return this.author.id;
  }
}

export default Book;