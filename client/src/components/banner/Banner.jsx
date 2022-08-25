import { styled, Typography } from "@mui/material"
import { Box } from "@mui/system";
import '../../styles/styles.css';

const Image = styled(Box)`
    background: url("https://cdn.pixabay.com/photo/2018/03/26/06/20/desktop-3261768_1280.jpg") center/50% ;
    height: 60vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

`;

const Heading = styled(Typography)`
    color:  gray;
    font-size: 80px;
    font-family: 'Dancing Script';
    font-weight: 700;
    line-height: 1;
`;

const SubHeading = styled(Typography)`
    font-size: 25px;
    font-family: 'Dancing Script', cursive;

`

const Banner = () => {
  return (
    <Image>
        <Heading>Blog</Heading>
        <SubHeading>Shape your thoughts...</SubHeading>
    </Image>
  )
}

export default Banner