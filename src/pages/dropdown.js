import React from "react";
import Dropdown from "../components/select-dropdown";
import { dropDownlistObj, dropDownlistArr } from "../data";

export default class Page extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectCountry: "",
      selectName: "",
      countryVal: [],
      nameVal: [],
      data: [],
      nameData: [],
      fieldName: "",
    };
    this.getSelectField = this.getSelectField.bind(this);
  }

  componentDidMount() {
    this.setState({
      data: dropDownlistObj,
      nameData: dropDownlistArr,
    });
  }
  // Get the dropdown field value
  getSelectField(name, value) {
    if (name && name === "country-to-select") {
      this.setState({
        selectCountry: value,
        fieldName: value,
      });
    }
    if (name && name === "name-to-select") {
      this.setState({
        selectName: value,
        fieldName: value,
      });
    }
  }

  render() {
    const { data, nameData, fieldName, countryVal, nameVal } = this.state;
    return (
      <React.Fragment>
        <div className="margin-div">
          <Dropdown
            id="country-to-select"
            dropDownList={data}
            name="country"
            fieldName={fieldName}
            dropdownClass="dropdown-country"
            setSelectField={this.getSelectField}
            value={countryVal}
            noResultText={"No Results Found"}
          />
        </div>
        <div className="margin-div">
          <Dropdown
            id="name-to-select"
            dropDownList={nameData}
            name="names"
            fieldName={fieldName}
            dropdownClass="dropdown-names"
            setSelectField={this.getSelectField}
            value={nameVal}
            noResultText={"No Results Found"}
          />
        </div>
      </React.Fragment>
    );
  }
}
