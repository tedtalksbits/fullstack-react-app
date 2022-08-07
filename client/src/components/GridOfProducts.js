import { Box, Grid, GridItem, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

export const GridOfProducts = () => {
    return (
        <Grid
            templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
            gap={6}
            padding={4}
        >
            {Array(4)
                .fill("")
                .map((e, key) => (
                    <GridItem key={key}>
                        <Box bg="teal.500" rounded={10} overflow="hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1520116468816-95b69f847357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                                alt="alt"
                            />
                            <Heading>Heading</Heading>
                            <Text>Text</Text>
                        </Box>
                    </GridItem>
                ))}
        </Grid>
    );
};
