import React, { useState } from "react";
import { Box, Heading, Text, Textarea, Button, Link, Image, useToast } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [cleanedText, setCleanedText] = useState("");
  const toast = useToast();

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const cleanText = () => {
    // Remove extra whitespace and line breaks
    let cleaned = inputText.replace(/\s+/g, " ").trim();

    // Remove HTML tags
    cleaned = cleaned.replace(/<[^>]*>/g, "");

    // Identify and label headings, paragraphs, lists
    cleaned = cleaned.replace(/^#+\s*(.*$)/gim, "[HEADING] $1");
    cleaned = cleaned.replace(/^(.*$)/gim, "[PARAGRAPH] $1");
    cleaned = cleaned.replace(/^\s*-\s*(.*$)/gim, "[LIST_ITEM] $1");

    // Identify and convert URLs and email addresses
    cleaned = cleaned.replace(/(https?:\/\/[^\s]+)/g, "[URL] $1");
    cleaned = cleaned.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, "[EMAIL] $1");

    setCleanedText(cleaned);
    toast({
      title: "Text cleaned",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box maxWidth="800px" mx="auto" mt={8} p={6}>
      <Heading mb={4}>Content Parser and Cleaner</Heading>
      <Text mb={4}>Enter text below to parse and clean the content. The utility will remove extra whitespace, strip HTML tags, identify content types like headings and lists, and convert URLs and email addresses.</Text>

      <Textarea value={inputText} onChange={handleInputChange} placeholder="Paste your content here..." size="lg" height="200px" mb={4} />

      <Button colorScheme="blue" onClick={cleanText} mb={8}>
        Clean Text
      </Button>

      {cleanedText && (
        <Box mb={8}>
          <Heading size="md" mb={2}>
            Cleaned Text:
          </Heading>
          <Text whiteSpace="pre-wrap">{cleanedText}</Text>
        </Box>
      )}

      <Box textAlign="center">
        <Link href="https://github.com/yourusername/content-cleaner" isExternal>
          <Button leftIcon={<FaGithub />} variant="outline">
            View on GitHub
          </Button>
        </Link>
      </Box>

      <Image src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxkYXRhJTIwY2xlYW5pbmd8ZW58MHx8fHwxNzEzMTM1NDI0fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Data cleaning" mt={8} mx="auto" />
    </Box>
  );
};

export default Index;
