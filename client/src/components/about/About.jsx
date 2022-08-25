
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub } from '@mui/icons-material';

import '../../styles/styles.css';

const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 30px;
    }
`;


const Text = styled(Typography)`
    color: #878787;
    font-family: 'Ubuntu';

`;

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3" style={{ fontWeight: 600, fontFamily: 'Ubuntu'}}>About Me</Typography>
                <Text variant="h5">I'm a student of pre-final year pursuing btech at Harcourt Butler Technical University.
                    I am interested in full stack web development. I enjoy building new web applications and exploring and learning new technologies & skills. <br /><br/>
                    If you are interested, you can view my projects here...
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/prateek7394" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
                
            </Wrapper>
        </Box>
    )
}

export default About;
















