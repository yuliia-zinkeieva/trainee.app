import React, {Component} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Container, Row, Col } from 'react-grid-system';
import "./styles.css";

//import { Redirect } from 'react-router';
import { Link, BrowserRouter } from 'react-router-dom';
//import ownPage from './components/own';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            data: [],
            perPage: 7,
            currentPage: 0
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }



    handleOnClick = () => {

        this.setState({redirect: true});
    }

    receivedData() {

        axios
            .get(`https://randomuser.me/api/?page=3&results=50&seed=abc`)
            .then(res => {

                const data = res.data.results;
                console.log(data);
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.map(pd =>
                    <div>
                    <Container fluid>

                    <Row>
                        <Col md={1}>
                          <img src={pd.picture.medium}/>
                        </Col>

                        <Col md={5}>
                            <Row>
                            <BrowserRouter>

                              <Link to="/ownPage"
                                 className="btn btn-primary">{pd.name.title} {pd.name.first} {pd.name.last}</Link>

                              </BrowserRouter>                               
                            </Row >
                            <Row >
                                Email: {pd.email}
                            </Row>
                        </Col>
                    </Row>

            </Container> </div>)

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),

                    postData
                })
            });

        // fetch('https://randomuser.me/api/?page=3&results=25&seed=abc')
        // .then(response => response.json())
        // .then(data => {
        //
        //     const users = data.results;
        //     console.log(users);
        //     const slice = users.slice(this.state.offset, this.state.offset + this.state.perPage)
        //         //console.log(slice);
        //     const postData = slice.map(pd =>
        //         <React.Fragment>
        //             <p>{pd.name.title} {pd.name.first} {pd.name.last}</p>
        //             <img src={pd.picture.medium} alt=""/>
        //         </React.Fragment>)
        //
        //     this.setState({
        //         pageCount: Math.ceil(data.length / this.state.perPage),
        //
        //         postData
        //     })
        // })
        // .catch(error => {
        //   console.log(error);
        // });

    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };

    componentDidMount() {
        this.receivedData()
    }
    render() {
        return (
            <div>
                {this.state.postData}
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>

        )
    }
}








// import React from 'react';
// import { Container, Row, Col } from 'react-grid-system';
// import axios from 'axios';
// import ReactPaginate from 'react-paginate';
//
// class UserProfiles extends React.Component {
//   constructor(){
//     super();
//     this.state = {
//       users: [],
//       isLoaded: false,
//         offset: 0,
//         data: [],
//         perPage: 5,
//         currentPage: 0
//     };
//   }
//   componentDidMount() {
//     fetch('https://randomuser.me/api/?page=3&results=20&seed=abc')
//         .then(response => {
//           if(response.ok) return response.json();
//           throw new Error('Request failed.');
//         })
//         .then(data => {
//           this.setState({users: data.results, isLoaded: true, pageCount: Math.ceil(data.length / this.state.perPage)});
//         })
//         .catch(error => {
//           console.log(error);
//         });
//   }
//   render() {
//     if (!this.state.isLoaded){
//       return <div> Loading...</div>
//     }
//     else{
//       return (
//           <div className='serProfileUs'>
//             <Container fluid>
//                 {this.state.users.map( (u, i) =>
//                     <Row>
//                         <Col md={1}>
//                           <img src={u.picture.medium}/>
//                         </Col>
//
//                         <Col md={5}>
//                             <Row>
//                                 {u.name.title} {u.name.first} {u.name.last}
//                             </Row >
//                             <Row >
//                                 Email: {u.email}
//                             </Row>
//                         </Col>
//                     </Row>
//                 )}
//
//             </Container>
//           </div>
//       );
//     }
//   }
// }
// export default UserProfiles;



