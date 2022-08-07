import { Badge, Box, Center, Container, Image, Text } from "@chakra-ui/react";
import React from "react";
import { GridOfProducts } from "../components/GridOfProducts";
import { Slider } from "../components/Slider";
import { useUser } from "../context/UserContext";

export const Home = () => {
    const { user } = useUser();
    return (
        <>
            <main className="main">
                {user.username ? (
                    <Box bg={"gray.200"} p={"1rem"}>
                        <Text fontSize={"2rem"}>Welcome {user.username}</Text>
                        <p>
                            You are logged in. You can now access the
                            application features.
                        </p>
                        <p>email : {user.email}</p>
                        {user.isAdmin && (
                            <>
                                access level:
                                <Badge
                                    color={"green.700"}
                                    bg={"green.300"}
                                    p={"1"}
                                    ml={"3"}
                                >
                                    Admin
                                </Badge>
                            </>
                        )}
                    </Box>
                ) : (
                    <>
                        <h1>Welcome, please sign in</h1>
                    </>
                )}
                {/* <Container centerContent>
               <Box bg='gray.200' maxW='3xl' rounded={12} padding='10'>
                  There are many benefits to a joint design and development system. Not only
                  does it bring benefits to the design team. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam amet labore obcaecati! Officiis cupiditate corrupti, magni delectus vitae, libero possimus excepturi voluptatibus sequi laborum illo quas repudiandae aspernatur culpa autem commodi similique voluptatem fuga accusamus suscipit corporis. Nihil enim esse excepturi cumque iste soluta corrupti quidem itaque. Assumenda enim aut inventore, animi reiciendis distinctio magnam amet, sint sapiente explicabo quidem nam vitae, possimus velit. Magnam exercitationem iure consequuntur, ad eveniet quas sit debitis autem. Optio perspiciatis ducimus dolores fuga non! Provident recusandae facere atque cumque corrupti quo ipsa, autem nobis aperiam laboriosam placeat voluptate consectetur cupiditate at pariatur. Quos laborum, voluptatibus autem cumque velit explicabo dolore eos! Tempore quisquam, magnam amet exercitationem voluptatibus dolorum deleniti quo doloremque laborum, saepe blanditiis, eveniet excepturi nobis nulla. Voluptas maxime veniam eligendi, accusantium harum eum quidem sint quia aspernatur perspiciatis nihil exercitationem, labore ratione est et distinctio. Consectetur est veritatis distinctio, quibusdam perferendis, consequatur culpa praesentium iure illo, reiciendis soluta! Sit perspiciatis explicabo dignissimos nihil modi distinctio magni voluptatum, dicta doloribus exercitationem, placeat, consequuntur numquam ipsum nulla enim officia ut necessitatibus eaque aspernatur aut. Aliquid reprehenderit sunt fugit? Sapiente eveniet provident reiciendis hic fugiat recusandae sequi incidunt, nihil veniam totam nulla ad iste eaque.
               </Box>
            </Container>

            <Center>

               <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                  <Image src='https://images.unsplash.com/photo-1641654850984-ed601db94394?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1442&q=80' alt='alt' />
                  <Box p='6'>
                     <Box display='flex' alignItems='baseline'>
                        <Badge colorScheme='messenger' borderRadius='full' >
                           New
                        </Badge>
                        <Box
                           color='gray.500'
                           fontWeight='semibold'
                           letterSpacing='wide'
                           fontSize='xs'
                           textTransform='uppercase'
                           ml='2'
                        >
                           2 beds  &bull; 3 baths

                        </Box>
                     </Box>
                     <Box display='flex' mt='2' alignItems='center'>
                        {Array(5)
                           .fill('')
                           .map((_, i) => (
                              <box-icon key={i} name='star' type={i < 4 ? 'solid' : ''} color='teal'></box-icon>
                           ))
                        }
                        <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                           4 reviews
                        </Box>
                     </Box>
                     <Box as='button' borderRadius='md' bg='teal' px={4} h={8} color='white' mt={4} >Button</Box>
                  </Box>
               </Box>
            </Center> */}
            </main>
            <Slider />
            {/* <GridOfProducts /> */}
        </>
    );
};
