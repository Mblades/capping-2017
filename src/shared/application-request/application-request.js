import React, { Component } from 'react';
import classnames from 'classnames';
import { browserHistory as history } from 'react-router';
import ReactDOM from 'react-dom';
import { TableContainer, Table, Paginator } from 'table-container';

export const TopBar = ({
                           rows,
                           query,
                           onQueryChange,
                           onRowDelete,
                           sortCol,
                           sortDesc,
                           selectedRows,
                           activePage
                       }) => {

    return (
        <div className="row" style={{padding: "10px 0"}}>
            <div className="col-sm-6">
                <input
                    className="form-control"
                    type="text"
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value, activePage, sortCol, sortDesc)}
                    placeholder="Search ..."/>
            </div>
            <div className="col-sm-6 text-right">
                <button
                    className="btn btn-danger"
                    onClick={onRowDelete.bind(this, selectedRows, activePage)}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export const PaginationInfo = ({
                                   total,
                                   pageSize,
                                   activePage
                               }) => {
    const totalPages = total % pageSize === 0 ? parseInt(total / pageSize) : parseInt(total / pageSize) + 1
    return (
        <div className="pull-left" style={{margin: "20px 0", fontSize: "16px"}}>
            <b>Total rows:</b> <i>{total}</i>
            <span style={{marginLeft: "20px"}}><b>Page:</b> <i>{activePage + 1} / {totalPages}</i></span>
        </div>
    )
}

export const PageSizeSelector = ({
                                     activePage,
                                     pageSizeList,
                                     currentPageSize,
                                     onChange
                                 }) => {
    return (
        <div className="pull-right btn-group" style={{margin: "20px 20px", fontSize: "16px"}}>
            {pageSizeList.map(size => {
                return(
                    <button
                        className={`btn btn-${currentPageSize===size ? 'success' : 'default'}`}
                        onClick={onChange.bind(this, size, activePage)}>
                        {`${size} per page`}
                    </button>
                )
            })
            }
        </div>
    )
}

class ApplicationRequest extends Component {
    constructor(props){
        super(props)

        // These elements will need to be connected to the database
        const rows = [
            {empid: "55321", empname: "Matthew Blades", appreq: "Informatica PowerCenter", yesno: "YES/NO" },
            {empid: "12093", empname: "Joe Schmoe", appreq: "Adobe Acrobat DC", yesno: "YES/NO" },
            {empid: "72819", empname: "Stacy Petersen", appreq: "JetBrains Webstorm", yesno: "YES/NO" },
            {empid: "29012", empname: "Bob Roberts", appreq: "Microsoft Office 365", yesno: "YES/NO" },
            {empid: "66421", empname: "David Fincher", appreq: "Sony Vegas Pro", yesno: "YES/NO" }
        ]

        this.state = {
            rows: rows,
            filteredRows: rows,
            query: '',
            pageSize: 4,
            pageData: rows.slice(0, 4),
            columns: [
                {id: "empid", title: "Employee ID", sortable: true},
                {id: "empname", title: "Employee Name", sortable: true},
                {id: "appreq", title: "Application Requested", sortable: true},
                // This element/column needs to implement the approve/deny button(s)
                {id: "yesno", title: "YES/NO", sortable: false}
            ],
            currentPage: 0
        }

        this.reloadData.bind(this)
    }

    reloadData(col, desc, query){
        const { rows } = this.state

        let newRows = rows

        if (col)
            newRows = newRows.sort((a, b) => {
                return desc ?
                    (b[col] > a[col] ? -1 : 1) :
                    (b[col] > a[col] ? 1 : -1)
            })

        newRows = newRows.filter(r => r.name.toLowerCase().indexOf(query.toLowerCase()) > -1)

        return newRows
    }

    handleSort(page, col, desc){
        const { query, pageSize } = this.state

        const newRows = this.reloadData(col, desc, query)

        this.setState({
            filteredRows: newRows,
            pageData: newRows.slice(page*pageSize, (page+1)*pageSize)

        })
    }

    handlePageClick(page, col, desc){
        const { rows, pageSize } = this.state

        this.setState({
            pageData: rows.slice(page*pageSize, (page+1)*pageSize)
        })
    }

    handleQueryChange(query, page, col, desc){
        const { pageSize } = this.state
        const newRows = this.reloadData(col, desc, query)

        this.setState({
            query,
            filteredRows: newRows,
            pageData: newRows.slice(0, pageSize)
        })
    }

    handleDelete(selectedRows, page){
        const { rows, pageSize } = this.state
        const newRows = rows.filter(r => selectedRows.indexOf(r.id) === -1)
        let newPage = page
        if ((page+1)*pageSize > newRows.length)
            newPage =  newRows.length % pageSize === 0 ? parseInt(newRows.length / pageSize) - 1 : parseInt(newRows.length / pageSize)

        this.setState({
            rows: newRows,
            filteredRows: newRows,
            pageData: newRows.slice(newPage*pageSize, (newPage+1)*pageSize)
        })
    }

    handlePageSizeChange(pageSize, page){
        const { rows } = this.state

        let newPage = page
        if ((page+1)*pageSize > rows.length)
            newPage =  rows.length % pageSize === 0 ? parseInt(rows.length / pageSize) - 1 : parseInt(rows.length / pageSize)


        this.setState({
            pageData: rows.slice(newPage*pageSize, (newPage+1)*pageSize),
            pageSize
        })
    }

    render(){
        const { rows, columns, filteredRows, pageData, query, pageSize } = this.state
        return (
            <div style={{padding: "30px"}}>
                <h2 className="text-center"> React Custom Table with Bootstrap </h2>
                <TableContainer
                    containerClass="table-responsive"
                    columns={columns}
                    rows={pageData}
                    onSort={this.handleSort.bind(this)}
                    onPageChange={this.handlePageClick.bind(this)}>
                    <TopBar
                        rows={rows}
                        query={query}
                        onRowDelete={this.handleDelete.bind(this)}
                        onQueryChange={this.handleQueryChange.bind(this)} />
                    <Table
                        tableClass="table table-bordered table-hover"
                        sortableClass="sortable"
                        sortDescClass="desc"
                        sortAscClass="asc"
                        selectedRowClass="selected-row"
                        selectable={true}
                        selectColumnTemplate={(v) => <input type='checkbox' checked={v}/>}
                        selectAllTemplate={(v) => <input type='checkbox' checked={v}/>}/>
                    <PaginationInfo
                        total={filteredRows.length}
                        pageSize={pageSize} />

                    <Paginator
                        paginatorClass="pagination pull-right"
                        total={filteredRows.length}
                        firstPageTemplate={() => <a>{"<<"}</a>}
                        prevPageTemplate={() => <a>{"<"}</a>}
                        pageTemplate={(p) => <a>{p}</a>}
                        nextPageTemplate={() => <a>{">"}</a>}
                        lastPageTemplate={() => <a>{">>"}</a>}
                        pageSize={pageSize}/>
                    <PageSizeSelector
                        pageSizeList={[1, 2, 4]}
                        currentPageSize={pageSize}
                        onChange={this.handlePageSizeChange.bind(this)} />
                </TableContainer>
            </div>
        )
    }
}

ReactDOM.render(<ApplicationRequest />, document.getElementById("application-request"));



/**/