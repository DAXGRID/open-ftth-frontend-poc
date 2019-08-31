import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

import ExampleDiagram from "components/Diagrams/ExampleDiagram.jsx";
import ClosureDiagram from "components/Diagrams/ClosureDiagram.jsx";

const Diagrams = () => {
  return (
    <div className="main-content buttons-with-margin">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <div className="card">
              <Row>
                <Col md={6}>
                  <div className="header">
                    <h4 className="title">Standard</h4>
                  </div>
                  <div className="content" style={{ height: "55vh" }}>
                    <ExampleDiagram />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="header">
                    <h4 className="title">Unbroken Closure</h4>
                  </div>
                  <div className="content" style={{ height: "200vh" }}>
                    <ClosureDiagram data={closureData} width={400} height={500} />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Diagrams;

const closureData = {
  routeNode: {
    conduitClosure: {
      id: "2bc0a204-986c-4a28-9ac7-5ae6954a0584",
      "sides": [
        {
          "position": "TOP",
          "ports": []
        },
        {
          "position": "RIGHT",
          "ports": [
            {
              "position": 1,
              "diagramLabel": null,
              "connectionKind": "PASS_THROUGH",
              "connectedToPort": 1,
              "connectedToSide": "LEFT",
              "multiConduitSegment": {
                "conduit": {
                  "color": "ORANGE"
                }
              },
              "terminals": [
                {
                  "position": 1,
                  "diagramLabel": "HH-5010",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 1,
                  "lineSegment": {
                    "conduit": {
                      "color": "BLUE"
                    }
                  }
                },
                {
                  "position": 2,
                  "diagramLabel": "HH-5010",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 2,
                  "lineSegment": {
                    "conduit": {
                      "color": "ORANGE"
                    }
                  }
                },
                {
                  "position": 3,
                  "diagramLabel": "HH-5010",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 3,
                  "lineSegment": {
                    "conduit": {
                      "color": "GREEN"
                    }
                  }
                },
                {
                  "position": 4,
                  "diagramLabel": "HH-5010",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 4,
                  "lineSegment": {
                    "conduit": {
                      "color": "BROWN"
                    }
                  }
                },
                {
                  "position": 5,
                  "diagramLabel": "HH-5010",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 5,
                  "lineSegment": {
                    "conduit": {
                      "color": "GREY"
                    }
                  }
                },
                {
                  "position": 6,
                  "diagramLabel": "HH-5010",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 6,
                  "lineSegment": {
                    "conduit": {
                      "color": "WHITE"
                    }
                  }
                },
                {
                  "position": 7,
                  "diagramLabel": "HH-5010",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 7,
                  "lineSegment": {
                    "conduit": {
                      "color": "RED"
                    }
                  }
                },
                {
                  "position": 8,
                  "diagramLabel": "HH-5010",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 8,
                  "lineSegment": {
                    "conduit": {
                      "color": "BLACK"
                    }
                  }
                },
                {
                  "position": 9,
                  "diagramLabel": "HH-5010",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 9,
                  "lineSegment": {
                    "conduit": {
                      "color": "YELLOW"
                    }
                  }
                },
                {
                  "position": 10,
                  "diagramLabel": "HH-5010",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 10,
                  "lineSegment": {
                    "conduit": {
                      "color": "VIOLET"
                    }
                  }
                }
              ]
            },
            {
              "position": 2,
              "diagramLabel": null,
              "connectionKind": "PASS_THROUGH",
              "connectedToPort": 2,
              "connectedToSide": "LEFT",
              "multiConduitSegment": {
                "conduit": {
                  "color": "ORANGE"
                }
              },
              "terminals": [
                {
                  "position": 1,
                  "diagramLabel": "HH-5010",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 1,
                  "lineSegment": {
                    "conduit": {
                      "color": "BLUE"
                    }
                  }
                },
                {
                  "position": 2,
                  "diagramLabel": "HH-5010",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 2,
                  "lineSegment": {
                    "conduit": {
                      "color": "ORANGE"
                    }
                  }
                },
                {
                  "position": 3,
                  "diagramLabel": "HH-5010",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 3,
                  "lineSegment": {
                    "conduit": {
                      "color": "GREEN"
                    }
                  }
                },
                {
                  "position": 4,
                  "diagramLabel": "HH-5010",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 4,
                  "lineSegment": {
                    "conduit": {
                      "color": "BROWN"
                    }
                  }
                },
                {
                  "position": 5,
                  "diagramLabel": "HH-5010",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 5,
                  "lineSegment": {
                    "conduit": {
                      "color": "GREY"
                    }
                  }
                },
                {
                  "position": 6,
                  "diagramLabel": "HH-5010",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 6,
                  "lineSegment": {
                    "conduit": {
                      "color": "WHITE"
                    }
                  }
                },
                {
                  "position": 7,
                  "diagramLabel": "HH-5010",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 7,
                  "lineSegment": {
                    "conduit": {
                      "color": "RED"
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          "position": "BOTTOM",
          "ports": []
        },
        {
          "position": "LEFT",
          "ports": [
            {
              "position": 1,
              "diagramLabel": null,
              "connectionKind": "PASS_THROUGH",
              "connectedToPort": 1,
              "connectedToSide": "RIGHT",
              "multiConduitSegment": {
                "conduit": {
                  "color": "ORANGE"
                }
              },
              "terminals": [
                {
                  "position": 1,
                  "diagramLabel": "HH-BDAL-01",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 1,
                  "lineSegment": {
                    "conduit": {
                      "color": "BLUE"
                    }
                  }
                },
                {
                  "position": 2,
                  "diagramLabel": "HH-BDAL-01",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 2,
                  "lineSegment": {
                    "conduit": {
                      "color": "ORANGE"
                    }
                  }
                },
                {
                  "position": 3,
                  "diagramLabel": "HH-BDAL-01",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 3,
                  "lineSegment": {
                    "conduit": {
                      "color": "GREEN"
                    }
                  }
                },
                {
                  "position": 4,
                  "diagramLabel": "HH-BDAL-01",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 4,
                  "lineSegment": {
                    "conduit": {
                      "color": "BROWN"
                    }
                  }
                },
                {
                  "position": 5,
                  "diagramLabel": "HH-BDAL-01",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 5,
                  "lineSegment": {
                    "conduit": {
                      "color": "GREY"
                    }
                  }
                },
                {
                  "position": 6,
                  "diagramLabel": "HH-BDAL-01",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 6,
                  "lineSegment": {
                    "conduit": {
                      "color": "WHITE"
                    }
                  }
                },
                {
                  "position": 7,
                  "diagramLabel": "HH-BDAL-01",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 7,
                  "lineSegment": {
                    "conduit": {
                      "color": "RED"
                    }
                  }
                },
                {
                  "position": 8,
                  "diagramLabel": "HH-BDAL-01",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 8,
                  "lineSegment": {
                    "conduit": {
                      "color": "BLACK"
                    }
                  }
                },
                {
                  "position": 9,
                  "diagramLabel": "HH-BDAL-01",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 9,
                  "lineSegment": {
                    "conduit": {
                      "color": "YELLOW"
                    }
                  }
                },
                {
                  "position": 10,
                  "diagramLabel": "HH-BDAL-01",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 10,
                  "lineSegment": {
                    "conduit": {
                      "color": "VIOLET"
                    }
                  }
                }
              ]
            },
            {
              "position": 2,
              "diagramLabel": null,
              "connectionKind": "PASS_THROUGH",
              "connectedToPort": 2,
              "connectedToSide": "RIGHT",
              "multiConduitSegment": {
                "conduit": {
                  "color": "ORANGE"
                }
              },
              "terminals": [
                {
                  "position": 1,
                  "diagramLabel": "HH-BDAL-01",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 1,
                  "lineSegment": {
                    "conduit": {
                      "color": "BLUE"
                    }
                  }
                },
                {
                  "position": 2,
                  "diagramLabel": "HH-BDAL-01",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 2,
                  "lineSegment": {
                    "conduit": {
                      "color": "ORANGE"
                    }
                  }
                },
                {
                  "position": 3,
                  "diagramLabel": "HH-BDAL-01",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 3,
                  "lineSegment": {
                    "conduit": {
                      "color": "GREEN"
                    }
                  }
                },
                {
                  "position": 4,
                  "diagramLabel": "HH-BDAL-01",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 4,
                  "lineSegment": {
                    "conduit": {
                      "color": "BROWN"
                    }
                  }
                },
                {
                  "position": 5,
                  "diagramLabel": "HH-BDAL-01",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 5,
                  "lineSegment": {
                    "conduit": {
                      "color": "GREY"
                    }
                  }
                },
                {
                  "position": 6,
                  "diagramLabel": "HH-BDAL-01",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 6,
                  "lineSegment": {
                    "conduit": {
                      "color": "WHITE"
                    }
                  }
                },
                {
                  "position": 7,
                  "diagramLabel": "HH-BDAL-01",
                  "connectionKind": "PASS_THROUGH",
                  "connectedToTerminal": 7,
                  "lineSegment": {
                    "conduit": {
                      "color": "RED"
                    }
                  }
                }
              ]
            }
          ]
        }
      ],
      length: 4,
      __typename: "ConduitClosureType",
      id: "0b2168f2-d9be-455c-a4de-e9169f000122",
      name: "J-1010"
    }
  }
};
