const express = require('express')
const bodyParser = require("body-parser");
const app = express()

let albumsData = [
    {
      albumId: "10",
      artistName: "Beyoncé",
      collectionName: "Lemonade",
      artworkUrl100:
        "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
      releaseDate: "2016-04-25T07:00:00Z",
      primaryGenreName: "Pop",
      url:
        "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0"
    },
    {
      albumId: "11",
      artistName: "Beyoncé",
      collectionName: "Dangerously In Love",
      artworkUrl100:
        "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
      releaseDate: "2003-06-24T07:00:00Z",
      primaryGenreName: "Rock",
      url:
        "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0"
    },
    {
    albumId: "12",
    artistName: "Beyoncé",
    collectionName: "Above and Beyoncé",
    artworkUrl100:
      "https://upload.wikimedia.org/wikipedia/en/b/b1/Beyonce_-_Above_and_Beyonce.png",
    releaseDate: "2009-06-16",
    primaryGenreName: "Jazz",
    url:
      "https://www.youtube.com/watch?v=ip9KSqj0ErI"
  }
  ];

app.use(bodyParser.json())

app.get("/albums", function ( req, res ) {
  const {primaryGenreName} = req.query // FILTER by query strings parameters
  console.log(primaryGenreName)
  const search = albumsData.find(albu => albu.primaryGenreName === primaryGenreName)
   return res.status(200).json(search)
 })


app.get("/albums/:albumId", function ( req, res ) {
 const {albumId} = req.params // filter by parameters
 const search = albumsData.find(albu => albu.albumId == parseInt(albumId))
  return res.status(200).json(search)
})

app.post("/albums", function( req, res) {
    console.log("POST /albums route");
    console.log(req.body) // *req.body* Esto contiene el valor de la solicitud, osea el valor de lo que se va a enviar en este caso un Obj
    albumsData.push(req.body)
    res.json(albumsData)
  });


app.delete("/albums/:albumId", function ( req, res ){
    const { albumId } = req.params

    const copy = [...albumsData]
    albumsData = albumsData.filter(element => element.albumId !== albumId)
    if (copy.length > albumId.length) {
      return res.status(200).json(albumsData)
    }
    return res.status(404).json('Not found')
})

app.put("/albums/:albumId", function ( req, res ) {
  const {albumId} = req.params  
   const change = albumsData.map(album => album.albumId == albumId ? album = req.body : album)
   albumsData = change
    res.status(200).json(change)
})


app.listen(8585, () => {
    console.log("This Server Is Running On Port # 8585");  
})

