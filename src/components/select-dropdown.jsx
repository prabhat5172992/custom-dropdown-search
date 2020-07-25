import React from "react";
import PropTypes from "prop-types";

export default class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      originalVal: [],
      fieldName: "",
      exactId: "",
      showBox: true,
      searchText: "",
    };
    this.currentDropdown = React.createRef();
    this.removeFocus = this.removeFocus.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.filterFunction = this.filterFunction.bind(this);
    this.selectField = this.selectField.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener("click", this.removeFocus);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.removeFocus);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.fieldName !== state.fieldName) {
      return {
        fieldName: props.fieldName ? state.fieldName : "",
      };
    }
    return null;
  }

  // Handle show and hide feature of dropdown
  handleDropdown() {
    const { dropDownList, id } = this.props;
    let { value } = this.props;
    let { originalVal } = this.state;
    const { showBox } = this.state;
    if (dropDownList) {
      value = Array.isArray(dropDownList)
        ? dropDownList
        : Object.keys(dropDownList).map((item) => item);
      originalVal = Array.isArray(dropDownList)
        ? dropDownList
        : Object.keys(dropDownList).map((item) => item);
      if (showBox) {
        document.getElementById(id).classList.add("show");
        this.setState({ showBox: false, exactId: id });
      } else {
        document.getElementById(id).classList.remove("show");
        this.setState({ showBox: true, exactId: "" });
      }
      this.setState({
        value,
        originalVal,
        searchText: "",
      });
    }
  }

  // Hide dropdown when clicking anywhere in body of browser
  removeFocus(e) {
    const { exactId } = this.state;
    const searchBox = document.getElementById(exactId);
    const list = [
      `button-${exactId}`,
      exactId,
      "search_select",
      `search-box-${exactId}`,
    ];
    if (searchBox && !list.includes(e.target.id)) {
      searchBox.classList.remove("show");
      this.setState({ showBox: true });
    }
  }

  // This populate data based on search in dropdown field
  filterFunction(e) {
    const { originalVal } = this.state;
    const returnArray = [];
    const key = e.target.value && e.target.value.toLowerCase();
    const source = originalVal.slice();
    source.forEach((item) => {
      if (key && item.trim().toLowerCase().search(key) >= 0) {
        if (returnArray.indexOf(item) === -1) {
          returnArray.push(item);
        }
      }
    });
    this.setState({
      value: key && key.trim() ? returnArray : originalVal,
      searchText: key,
    });
  }

  // This select the value clicked in dropdown box
  selectField(item) {
    const { setSelectField, fieldName } = this.props;
    this.setState({
      fieldName: item === fieldName ? fieldName : item,
    });
    setSelectField(this.currentDropdown.current.id, item);
  }

  // This populate all the list items inside dropdown box
  displayItems() {
    const { value } = this.state;
    return value.map((item, index) => (
      <li className="ui-menu-item" key={item}>
        <button
          id={`ui-id${index + 1}`}
          tabIndex="-1"
          key={item}
          className="ui-menu-item-wrapper"
          onClick={() => this.selectField(item)}
        >
          {item}
        </button>
      </li>
    ));
  }

  render() {
    const { id, name, dropdownClass, noResultText } = this.props;

    const { value, fieldName, searchText } = this.state;
    return (
      <React.Fragment>
        <div className="dropdown" id={`custom-dropdown-${name}`} name={name}>
          <input
            type="button"
            id={`button-${id}`}
            name={`btn-${name}`}
            onClick={this.handleDropdown}
            value={fieldName}
            className="dropbtn dropdown-caret"
          />
          <div id={id} className={dropdownClass} ref={this.currentDropdown}>
            <div id="search_select" className="wrapDropdown">
              <input
                type="text"
                id={`search-box-${id}`}
                name={`search-${name}`}
                placeholder="Search.."
                className="search_box_input"
                onChange={(e) => this.filterFunction(e)}
                value={searchText}
                autoComplete="new-password"
              />
              <div className="drop-down-list">
                <ul id="ui-id-1" className="ui-menu ui-widget-content">
                  {value.length ? (
                    this.displayItems()
                  ) : (
                    <li className="ui-menu-item">{noResultText}</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Dropdown.propTypes = {
  dropDownList: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  noResultText: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  dropdownClass: PropTypes.string.isRequired,
  setSelectField: PropTypes.func.isRequired,
};
