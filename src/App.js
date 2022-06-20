import { Box, Button, Typography, Dialog, TextField } from "@mui/material";
import { useState } from "react";

function App() {
  const [articles, setArticles] = useState([])
  const [openCreatearticleDialoge, setOpenCreatearticleDialoge] = useState(false)
  const [openDetaildarticleDialoge, setOpenDetaildarticleDialoge] = useState(false)
  const [openEditArticleDialoge, setEditArticleDialoge] = useState(false)


  const [articleTitle, setArticleTitle] = useState('')
  const [articleContent, setArticleContent] = useState('')
  const [articleIndex, setArticleIndex] = useState()

  const [details, setDetails] = useState({})

  const handleCloseCreateDialoge = () => {
    setOpenCreatearticleDialoge(false)
  }
  const handleCloseDetailDialoge = () => {
    setOpenDetaildarticleDialoge(false)
  }

  // add articles 
  const handleAddArticle = () => {

    let copyArticles = [...articles]
    copyArticles.push({ title: articleTitle, content: articleContent, createdDate: new Date() })
    setArticles(copyArticles);
    setOpenCreatearticleDialoge(false)

  }

  // details articles
  const handleOpenDetails = (index) => {
    setDetails({ title: articles[index]?.title, content: articles[index]?.content, createdDate: articles[index]?.createdDate })

    setOpenDetaildarticleDialoge(true)

  }
  const handleEditArticles = (index) => {
    setEditArticleDialoge(true)
    setArticleIndex(index)

  }

  const handleEditArticlesClose = () => {
    const copyArticles = [...articles]

    copyArticles[articleIndex] = { title: articleTitle, content: articleContent, createdDate: new Date() }
    setArticles(copyArticles);
    setEditArticleDialoge(false);
  }
  const handleDeleteArticles = (index) => {
    const copyArticles = [...articles]

    const newArticles = copyArticles.filter((article, indexOfArticle) => indexOfArticle !== index)
    setArticles(newArticles);

  }





  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '500px' }}>
      <Button onClick={() => setOpenCreatearticleDialoge(true)} variant='outlined'> Create New Article</Button>

      {articles.length <= 0 ? <Box>Nothing</Box> : articles.map((articles, index) => <Box
        key={articles.title}
      >
        <Box onClick={() => handleOpenDetails(index)}>
          <Typography variant="h4">{articles?.title}</Typography>
          <Typography variant="h6">{articles?.content}</Typography>
          <Typography variant="body2">{articles?.createdDate?.toISOString()}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => handleEditArticles(index)} variant='contained'>Edit</Button>
          <Button onClick={() => handleDeleteArticles(index)} variant='contained'> DELETE</Button>
        </Box>
      </Box>

      )}

      <Dialog
        open={openCreatearticleDialoge}
        onClose={handleCloseCreateDialoge}
      >

        <TextField onChange={(e) => setArticleTitle(e.target.value)} label="Enter title" variant="standard"> </TextField>
        <TextField onChange={(e) => setArticleContent(e.target.value)} label="Enter Content" variant="standard"> </TextField>
        <Button onClick={handleAddArticle} variant='contained'> Post</Button>
      </Dialog>

      <Dialog
        open={openDetaildarticleDialoge}
        onClose={handleCloseDetailDialoge}
      >
        <Typography variant="h4">{details?.title}</Typography>
        <Typography variant="h6">{details?.content}</Typography>
        <Typography variant="body2">{details?.createdDate?.toISOString()}</Typography>

      </Dialog>
      <Dialog
        open={openEditArticleDialoge}
        onClose={() => setEditArticleDialoge(false)}
      >
        <TextField onChange={(e) => setArticleTitle(e.target.value)} label="Enter title" variant="standard"> </TextField>
        <TextField onChange={(e) => setArticleContent(e.target.value)} label="Enter Content" variant="standard"> </TextField>
        <Button onClick={handleEditArticlesClose} variant='contained'> Update</Button>

      </Dialog>

    </Box>

  );
}

export default App;
