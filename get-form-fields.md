# How to use `getFormFields`

To be able to send data to an API, we'll need a way to retrieve that data from
forms in the DOM. It turns out that needing to grab some user
input and send it to the API is a very common problem in front-end web
development.

To help solve that problem, we've included a function called `getFormFields` in
this template. Let's take a look at how to use that function. In this example,
the user is inputting information about a book.

> **Note:** In your projects, the code below will be spread out over several
> files.

## Book Form Example

### Step 1: The `form` and `inputs`

First, your `<input>`s will need to be wrapped in a `<form>`, like this:

```html
<form id="create-book">
  <input name="book[title]" type="text">
  <input name="book[author]" type="text">
  <button type="submit">Create Book</button>
</form>
```

Each `input` is **required to have a `name` and a `type` attribute**.

Nesting `inputs` in other elements such as `div`s or `fieldset`s is supported.

> Note that each `input` has a `name` attribute. This attribute is used
> by `getFormFields` to decide how to structure the user's inputs when they
> submit the form. Often for your projects, the structure will be
> `resourceName[resourceProperty]`, like `book[author]`, but more generally
> follows `topLevelKeyName[nestedKeyName]` (see the data example breakdown).

### Step Two: The JavaScript and jQuery

Then, in your Javascript, you'd do something like this:

```js
const getFormFields = require('<path to lib>/get-form-fields.js')

$('#create-book').on('submit', function (event) {
  event.preventDefault()

  const form = event.target
  const bookData = getFormFields(form)
  console.log(bookData) // returned JavaScript object
})
```

### Step Three: The Data

Based on the form, the `bookData` variable would look like this:

```js
{
  book: {
    title: "<whatever was entered in the title input >",
    author: "<whatever was entered in the author input>"
  }
}
```

Do you notice the structure of the data? It's set up that way because of the
`name` attribute on the form. The input for the book title had
`name="book[title]"`. When `getFormFields` reads the form data, it creates an
empty object for that data. Then, it uses the `name` attribute to create keys
on that object.

## Data Breakdown

Consider the following form:

```html
<form id="book-to-movie">
  <input name="book[title]" type="text" placeholder="Book Title">
  <input name="movie[title]" type="text" placeholder="Movie Title">
  <button type="submit">Create Book-To-Movie Log</button>
</form>
```

The form is asking for a book title and movie title, and the names of the inputs
are `"book[title]"` and `"movie[title]"` respectively.

How do you expect the form data to look after passing the form to
`getFormFields` when the user submits?

Since the name attributes have completely different values, the data will end
up like this:

```js
{
  book: {
    title: '<whatever the user put in the book title input>'
  },
  movie: {
    title: '<whatever the user put in the movie title input>'
  }
}
```

Consider the following JavaScript example to break this down further:

```js
const data = {}

data['book']['title'] = 'A book title our user gave us'
data['movie']['title'] = 'A movie title our user gave us'
console.log(data)
/*
{
  movie: { title: 'A movie title our user gave us' },
  book: { title: 'A book title our user gave us' }
}
*/

data['book']['author'] = 'A book author we want to be grouped with the book title'
console.log(data)
/*
{
  movie: { title: 'A movie title our user gave us' },
  book: {
    title: 'A book title our user gave us',
    author: 'A book author we want to be grouped with the book title'
  }
}
*/
```
