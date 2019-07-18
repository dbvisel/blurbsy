# blurbsy

This version is a Gatsby front end and a WordPress backend.

TODO: figure out why blurb repeaters aren't coming across. This works in CBBE with basically the same setup?

in Gatsby Node:

1) make a page for every author
2) make a page for every book

books:

query Books {
  allAirtable(filter: {table: {eq: "books"}}) {
    edges {
      node {
        data {
          Title
          AuthorLink {
            data {
              Name
            }
          }
          BlurbLinks {
            data {
            Blurb_text
              Blurber {
                data {
                  Name
                }
              }
            }
          }
        }
      }
    }
  }
}



authors:

query Authors {
  allAirtable(filter: {table: {eq: "authors"}}) {
    edges {
      node {
        table
        data {
          Name
          Bio
          books {
            data {
              Title
            }
          }
          blurbs
        }
        id
      }
    }
  }
}

blurbs:

query Blurbs {
  allAirtable(filter: {table: {eq: "blurbs"}}) {
    edges {
      node {
        data {
          Blurb_text
          Blurber {
            data {
              Name
            }
            id
          }
          Book {
            data {
              Title
            }
            id
          }
        } 
        id
      }
    }
  }
}
