import React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'

function HomeCardComponent({
    image,
    title,
    description,
    buttonText,
    onButtonClick,
    themeColors,
    hoverScale = 1,
}) {
    const Truncat = (value) => {
        return value.length >= 20 ? value.slice(0, 20) + '...' : value
    }

    const DesTruncat = (value) => {
        return value.length >= 50 ? value.slice(0, 50) + '...' : value
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}    // load hone pe 30px niche se
            animate={{ opacity: 1, y: 0 }}     // phir y=0 pe aake visible ho
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ scale: hoverScale }}
        >
            <Card
                sx={{
                    maxWidth: 345,
                    background: themeColors.cardBackground,
                    color: themeColors.txtColor,
                    borderRadius: '20px',
                }}
            >
                <CardMedia sx={{ height: 140 }} image={image} title={title} />
                <CardContent>
                    <Typography color={themeColors.txtColor} gutterBottom variant="h5">
                        {Truncat(title)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: themeColors.subTxt }}>
                        {DesTruncat(description)}
                    </Typography>
                </CardContent>
                <CardActions sx={{ padding: '15px' }}>
                    <Button
                        onClick={onButtonClick}
                        size="small"
                        sx={{
                            fontWeight: 500,
                            border: '0',
                            borderRadius: '7px',
                            background: themeColors.btnBackground,
                            color: themeColors.btnTxtColor,
                            boxShadow: '0px 0px 6px -2px black',
                        }}
                    >
                        {buttonText}
                    </Button>
                </CardActions>
            </Card>
        </motion.div>
    )
}

export default HomeCardComponent
