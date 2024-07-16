import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function MediaCard({image,title,content}) {
  return (
    <div className="Card">
    <Card sx={{ maxWidth: 250,
    boxShadow:'0 8px 16px rgba(0,0,0,0.2)',
      '&:hover': {
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', 
            transform: 'scale(1.10)'
          }
    }} >
      <CardMedia
        sx={{ height: 75 }}
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
}
