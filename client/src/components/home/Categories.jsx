import {
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";

import { categories } from "../../constants/data";

import '../../styles/styles.css';


const StyledTable = styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);
`;
const StyledButton = styled(Button)`
  margin: 20px;
  width: 85%;
  background: #447eea;
  color: #fff;
  font-family: 'Ubuntu';

`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-family: 'Dancing Script', cursive;
  font-size: 18px;
  font-weight: 600;
`

const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  // useSearchParams pulls out the value of category from the url

  return (
    <>
      <StyledLink
        to={`/create?category=${category || ""}`}
      >
        <StyledButton variant="contained">Create Blog</StyledButton>
      </StyledLink>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <StyledLink to="/">All</StyledLink>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <StyledLink to={`/?category=${category.type}`}>{category.type}</StyledLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Categories;
