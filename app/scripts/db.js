var db = new PouchDB('polymeroff');
var remoteCouch = false;

function addEntidade(id, title, description) {
  db.put(
    {
          _id: id,
          title: title,
          description: description
    }
  ).then(function (response) {
   console.log("cadastrado com sucesso");
 }).catch(function (err) {
   console.log(err);
 });
 setTimeout('location.reload()', 100);
}

function removeEntidade(id) {
  db.get(id).then(function(doc) {
    return db.remove(doc);
  }).then(function (result) {
    console.log("removido com sucesso");
  }).catch(function (err) {
    console.log(err);
  });
  setTimeout('location.reload()', 100);
}

function editEntidade(id, title, description) {
  db.get(id).then(function(doc) {
    return db.put({
      _id: id,
      _rev: doc._rev,
      title: title,
      description: description
    });
  }).then(function(response) {
    console.log("editado com sucesso");
  }).catch(function (err) {
    console.log(err);
  });
  setTimeout('location.reload()', 1000);
}

function getEntidadeById(id) {
  	db.get(id).then(function(response) {
      document.getElementById("inputId").value = response._id;
      document.getElementById("inputTitle").value = response.title;
      document.getElementById("inputDescription").value = response.description;
    }).catch(function (err) {
      console.log(err);
    });
 }

function getAllEntidades() {
    //return 
    db.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (result) {
      document.querySelector("entidade-exemplo").items = result.rows;
      //return result.rows;
      /*var entidades = result.rows;
      entidades.forEach(function(entry) {
          console.log(entry.doc);
      });*/
      //console.log(result.rows.length);
    }).catch(function (err) {
      console.log(err);
    });
}