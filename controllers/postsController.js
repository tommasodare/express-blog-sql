const arrayPosts = require('../data/posts_array')
const connection = require('../data/db');

function index(req, res) {

    // Prepariamo la query SQL per recuperare i post
    const sql = 'SELECT * FROM posts'

    // Eseguiamo la query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'database query failes' })
        res.json(results)
    })
}

function show(req, res) {

    // Recuperiamo l'id dall'URL
    const id = req.params.id

    const sql = 'SELECT * FROM posts WHERE id = ?'

    // Eseguiamo la query
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Post not found' });
        res.json(results[0]);
    });

}

function store(req, res) {
    //res.send("Create new post")
    //console.log(req.body);

    // Creo un nuovo slug utilizzando il titolo fornito dall'utente
    const newSlug = req.body.title.replaceAll(" ", "-")

    // Creo un nuovo oggetto post
    const newPost = {
        title: req.body.title,
        slug: newSlug.toLowerCase(),
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }

    // Aggiugiamo il nuovo post all'arrayPosts
    arrayPosts.push(newPost)

    // Loggiamo in console
    console.log(arrayPosts);

    // Restituisco lo status corretto e il post appena creato
    res.status(201).send(newPost)

}

function update(req, res) {
    //res.send(`Update the post with slug: ${req.params.id}`)

    // Recupero lo slug dall'URL
    const postSlug = req.params.slug

    // Cerco il post tramite lo slug
    const post = arrayPosts.find(post => post.slug === postSlug)

    // Creo un nuovo slug utilizzando il titolo fornito dall'utente
    const newSlug = req.body.title.replaceAll(" ", "-")

    if (!post) { // Se il post cercato non esiste
        res.status(404)

        return res.json({
            status: 404,
            error: "Not Found",
            message: " Post non trovato"
        })

    }

    // Aggiorno il post
    post.title = req.body.title
    post.slug = newSlug.toLowerCase()
    post.content = req.body.content
    post.image = req.body.image
    post.tags = req.body.tags


    console.log(arrayPosts);

    res.json(post)

}

function modify(req, res) {
    //res.send(`Modify the post with id: ${req.params.id}`)

    // Recupero lo slug dall'URL
    const postSlug = req.params.slug

    // Cerco il post tramite lo slug
    const post = arrayPosts.find(post => post.slug === postSlug)

    // Creo un nuovo slug utilizzando il titolo fornito dall'utente
    const newSlug = req.body.title.replaceAll(" ", "-")

    if (!post) { // Se il post cercato non esiste
        res.status(404)

        return res.json({
            status: 404,
            error: "Not Found",
            message: " Post non trovato"
        })

    }

    // Aggiorno il post
    post.title = req.body.title
    post.slug = newSlug.toLowerCase()
    post.content = req.body.content
    post.image = req.body.image
    post.tags = req.body.tags


    console.log(arrayPosts);

    res.json(post)
}

function destroy(req, res) {

    const id = req.params.id

    connection.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete post' })
        res.sendStatus(204)
    })

}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}