const page_notFound = (req,res) => {
    res.status(404).send("Page does not exist");
}


module.exports = page_notFound;