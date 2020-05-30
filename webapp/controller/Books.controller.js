sap.ui.define(
    ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
    (Controller, MessageToast) => {
        "use strict"
        return Controller.extend("org.ubb.books.controller.Books", {
            read: function() {
                const book = {
                    changedOn: null,
                    changedBy: null,
                    createdBy: null,
                    available: parseInt(this.byId("available").getValue(), 10),
                    total: parseInt(this.byId("total").getValue(), 10),
                    publishDate: this.byId("publishDate").getValue() + "T12:00:00",
                    language: this.byId("language").getValue(),
                    author: this.byId("author").getValue(),
                    title: this.byId("title").getValue(),
                    isbn: this.byId("isbn").getValue()
                };
                return book
            },
            create: function () {
                const book = this.read()
                if (book.available > book.total) {
                    MessageToast.show("More books available than total")
                    return
                }
                this.getView().getModel().create("/Books", book, {
                    success: () => {
                        MessageToast.show("Created successfully")
                    },
                    error: () => {
                        MessageToast.show("Could not create")
                    }
                })
            },
            update: function () {
                const book = this.read()
                if (book.available > book.total) {
                    MessageToast.show("More books available than total")
                    return
                }
                this.getView().getModel().update("/Books('" + book.isbn + "')", book, {
                    success: () => {
                        MessageToast.show("Updated successfully")
                    },
                    error: () => {
                        MessageToast.show("Could not update")
                    }
                })
            },
            delete: function () {
                const selectedContexts = this.byId("idBooksTable").getSelectedContexts()
                const bookPath = selectedContexts[0].getPath()
                this.getView().getModel().remove(bookPath, {
                    success: () => {
                        MessageToast.show("Deleted successfully")
                    },
                    error: () => {
                        MessageToast.show("Could not delete")
                    }
                })
            }
        })
    }
)