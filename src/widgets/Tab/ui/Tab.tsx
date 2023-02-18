import Row from "react-bootstrap/Row"
import { Tab as TabBoot } from "react-bootstrap"
import { Navigation } from "./Navigation"
import { Content } from "./Content"

export enum InfoTabsEnum {
  aboutUs,
  contacts,
  feedback,
  delivery,
  pay,
  instruction,
}

function Tab() {
  return (
    <TabBoot.Container
      id="left-tabs-example"
      defaultActiveKey={InfoTabsEnum.aboutUs}
    >
      <Row>
        <Navigation />
        <Content />
      </Row>
    </TabBoot.Container>
  )
}

export default Tab
