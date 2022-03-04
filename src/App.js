import { useState, useRef } from "react";
import {
ChakraProvider,
Stack,
extendTheme,
Box,
Container,
Text,
Heading,
Textarea,
CSSReset,
Button,
Editable,
EditablePreview,
EditableInput,
} from "@chakra-ui/react";

const theme = extendTheme({
colors: {
primary: {
main: "#3f51b5",
grey: "#f5f5f5",
},
secondary: {
main: "#008060",
},
},
});

const intialState = [
{
doc_name: "History of the World",
doc_content: "This is the history of the world",
},
{
doc_name: "Challenge of humanity",
doc_content: "This is the beginning of the challenge of humanity",
},
];

function App() {
const [documents, setDocuments] = useState(intialState);
const [active, setActive] = useState(null);
const [index, setIndex] = useState(null);
const textRef = useRef();

const handleList = (document, index) => {
setActive(document);
setIndex(index);
textRef.current.focus();
};

const changeText = (e) => {
let inputValue = e.target.value;
const newDocuments = [...documents];
newDocuments[index].doc_content = inputValue;
setDocuments(newDocuments);
};

const changeHeader = (e) => {
const newDocuments = [...documents];
newDocuments[index].doc_name = e;
setDocuments(newDocuments);
};

const addNewDoc = () => {
const newDoc = { doc_name: "Edit Title", doc_content: " " };
setDocuments([newDoc, ...documents]);
handleList(newDoc, 0);
};

return (
<ChakraProvider theme={theme}>
<CSSReset />
<Container maxW="full">
<Box
bg="primary.main"
p={5}
borderWidth="1px"
minWidth="100%"
textAlign="center"
color="white"
>
<Heading as="h4" size="lg">
Online Word Document Editor
</Heading>
</Box>

<Box
mt={8}
display="flex"
flexDirection={["row"]}
bgColor="whiteAlpha.50"
>
<Stack
borderColor="primary.main"
height="calc(100vh - 10rem)"
overflowY="scroll"
mt={6}
>
<Button onClick={() => addNewDoc()} color="white" bg="primary.main">
Create new document
</Button>
<Box>
{documents.map((document, index) => {
return (
<Box
borderRadius="md"
_hover={{
background: "gray.100",
}}
bgColor={active === document && "primary.main"}
color={active === document && "white"}
borderWidth="1px"
onClick={() => handleList(document, index)}
p={5}
mt={2}
shadow="md"
borderWidth="1px"
cursor="pointer"
key={index}
maxW={500}
>
<Heading fontSize="xl">{document.doc_name}</Heading>
<Text isTruncated mt={4}>
{document.doc_content}
</Text>
</Box>
);
})}
</Box>
</Stack>

<Box p={8} mx={8} flexGrow={1}>
{!active && (
<Heading fontSize="xl">Choose a document to edit</Heading>
)}
<Editable
fontSize="4xl"
value={active?.doc_name || ""}
onChange={(e) => changeHeader(e)}
>
<EditablePreview />
<EditableInput />
</Editable>
<Textarea
ref={textRef}
mt={6}
value={active?.doc_content}
onChange={(e) => changeText(e)}
placeholder="Here is a sample placeholder"
height="100%"
resize="none"
/>
</Box>
</Box>
</Container>
</ChakraProvider>
);
}

export default App