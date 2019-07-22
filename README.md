# blurbsy

This project uses a Gatsby front end and an Airtable backend. Airtable is maybe not the most sustainable backend? But it works right now & it's easy to use. Demo version: https://blurbsy.netlify.com

## making this work

The _gatsby-config.js_ file expects there to be a _.env.production_ and _.env.development_ file. Those files should look like this:

    GATSBY_AIRTABLE_APIKEY=[whatever the Airtable API key is]
    GATSBY_AIRTABLE_BASEID=[whatever the Airtable BaseID is]

The Airtable I'm using right now has three tables: one for authors, one for books, and one for blurbs. 

## TODO:

 * figure out a way to get this information automatically?
 * on build, pull in book information from the LibraryThing API ( https://www.librarything.com/services/ )? Not sure how good that data is aside from covers.