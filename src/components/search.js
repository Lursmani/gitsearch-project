import React, {useEffect, useState,} from 'react'
import {Container, Row, Col, Form, Button, ButtonGroup } from "react-bootstrap"
import {DebounceInput} from 'react-debounce-input'
import "./search.css"






export default function Search(props) {

    
    const [searchText, setSearchText] = useState("")
    const [result, setResult]= useState({})
    const [page, setPage] = useState(1)
    const [pageCounter, setPageCounter] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const [type, setType] = useState("Any")
    const [loaded, setLoaded] = useState(false)
    
    useEffect(() => {
        if (searchText !== "") {
        fetch(`https://api.github.com/search/users?q=${searchText}&per_page=10&page=${page}`)
        .then (response => response.json())
        .then (
            results => {
                setResult(results)
                setTotalPages(Math.ceil(results.total_count / 10))
                console.log(Math.ceil(results.total_count / 10))
                setLoaded(true)
            }
        )
        .catch (error => console.log(`Something went wrong: ${error}`))
    }
        
    }, [searchText, page]);

    

    const renderResults = () => {
        const results = result
        let regex = /(((\w|\d)\w+)|((\w|\d))\/(\w)\w+)$/g

        if (Object.keys(results).length && results.items !== undefined) {
            return (
                <div>
              
        
                    {results.items.map((res) => {
                        console.log(res.login)
                        let userType

                        if (type === "Any") {
                            userType = res.type === "User" || res.type === "Organization"
                        } else
                        if (type === "User") {
                            userType = res.type === "User"
                       } else
                        if (type === "Organization") {
                           userType = res.type === "Organization"
                       }



                        if (userType) {
                        return (
                            <div className="git-user-card">
                            <img className="git-user-pic" src={res.avatar_url} alt={`${res.login}'s Avatar`} />
                            <h3 className="git-user-name">{res.login}</h3> 
                            <h6 className="git-user-type">{res.type}</h6>
                            <a className="git-user-repo" href={`users/${res.repos_url.match(regex)}`}>Repos</a>
                            </div>
                        ) }
                    })}
                    
                </div>
            )
        } else if (results.items === undefined && searchText !== "" && loaded) {
                return(
                    <div>
                        <h4>Error: Too many requests. Github limit is 10 requests per minute.</h4>
                    </div>
                )
        }
    }

        useEffect(()=>{
            renderResults()
            setPageCounter(page)
        }, [page])
        useEffect(()=> {
            setPage(1)
        }, [searchText])
    
    const pageDown = () => {
        page > 1 && setPage(page - 1)
        console.log(page)
    }
    const pageUp = () => {
        page < totalPages && setPage(page + 1)
        console.log(page)
    }

  




    return (
        <Container fluid style={{minHeight: "80vh",}}>
            <Row style={{margin: "0.5em 0",}}>
                <Col lg="3"  md="3" sm="0"></Col>
                <Col lg="6" md="6" sm="12" style={{padding: "0"}}>
                <Form center>
                <DebounceInput
                element={Form.Control}
                debounceTimeout={1000} 
                type="text"
                placeholder="Search..."
                onChange={e => setSearchText(e.target.value)} />
                </Form>
                </Col>
                <Col lg="3" md="3" sm="0"></Col>
            </Row>
           
            
                <div className="git-btn-group-div" >
                <h3 className="git-btn-group-text">User Type:</h3>
                <ButtonGroup className="git-btn-group" label="User Type:" >
                    <Button variant={type === "Any" ? "secondary" : "primary"} onClick={() => setType("Any")}>Any</Button>
                    <Button variant={type === "User" ? "secondary" : "primary"} onClick={() => setType("User")}>User</Button>
                    <Button variant={type === "Organization" ? "secondary" : "primary"} onClick={() => setType("Organization")}>Organization</Button>
                </ButtonGroup>
                </div>
            

            <div className="git-results-outer-div">
            <h4 className="git-results-info-text">{"Searching for: " + searchText}</h4>
            <div className="git-results-div">{renderResults()}</div>
            </div>


            <div className="git-userpages-div">
                <Button className="git-userpages-left" variant="primary" onClick={() => pageDown()}>&lt;</Button>
                
                <Form.Control placeholder={`${page}`} className="git-userpages-number" type="number" min="1" max={totalPages} value={pageCounter} onChange={e => setPageCounter(e.target.value)} />
                <Button className="git-userpages-go" variant="primary" onClick={() => setPage(pageCounter)}>Go</Button>
                
                <Button className="git-userpages-right" variant="primary" onClick={() => pageUp()}>&gt;</Button>
            </div>

      
        </Container>
    )
}
