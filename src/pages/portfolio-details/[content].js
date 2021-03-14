import React, { Fragment } from "react";
import { useRouter } from 'next/router'
import { Container, Row, Col } from "react-bootstrap";

import { Section, Button, Title, Text, Box } from "../../components/Core";
import PageWrapper from "../../components/PageWrapper";

import { masonryWorks1 } from "../../data";

const WorkSingle = () => {
  const router = useRouter()
  const title = router.query.content
  console.log(title)

  return (
    <>
      <PageWrapper>
      {masonryWorks1.filter(item => item.id == title).map(filteredId => (
        <Fragment key={filteredId.id}>
          <Section className="mt-lg-5">
            <Container>
              <Row>
                <Col lg="8">
                  <Text variant="tag">{filteredId.categories[0]}</Text>
                  <Title variant="secSm" className="my-4">
                    {filteredId.brand}
                  </Title>
                  <Text
                    variant="p"
                    css={`
                      max-width: 750px;
                    `}
                  >
                    {filteredId.title}
                  </Text>
                </Col>
              </Row>
            </Container>
          </Section>
          {filteredId.livework != undefined ? (
            <div className="mt-lg-3">
              <Container>
                <Row>
                  <Col lg="4">
                    <a 
                      href={filteredId.livework}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button arrowRight>
                        Live work
                      </Button>
                    </a>
                  </Col>
                </Row>
              </Container>
            </div>
          ) : null}
          <Box py={4}>

          </Box>
        </Fragment>
      ))}
      </PageWrapper>
    </>
  );
};
export default WorkSingle;
