import React, {useState, useEffect} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faStar, faCodeBranch, faExclamationCircle} from "@fortawesome/free-solid-svg-icons"
import {faJs, faPython, faPhp, faJava, faHtml5, faCss3} from "@fortawesome/free-brands-svg-icons"
import {Button, Form, ButtonGroup} from "react-bootstrap"
import { Icon, InlineIcon } from '@iconify/react'
import bxlCPlusPlus from '@iconify-icons/bx/bxl-c-plus-plus'
import typescriptIcon from '@iconify-icons/cib/typescript';
import "./repos.css"
import "./search.css"




const Repos = ({match}) => {
    const [results, setResults] = useState({})
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState("forks")
    const [pageCounter, setPageCounter] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const [loaded, setLoaded] = useState(false)
    const id = match.params.id


   
    
    
    useEffect (() =>{
    fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(`user:${id} sort:${sort}`)}&per_page=10&page=${page}`)
    .then(result => result.json())
    .then(data => {
                setResults(data)
                setTotalPages(Math.ceil(data.total_count / 10))
                console.log(Math.ceil(data.total_count / 10))    
                setLoaded(true)
}         
    )
    .then(console.log(results))
 
    }, [page, sort])


    
    const renderResults = () => {
        

        if (results.items !== undefined) {
        return (
        <div className="git-repos-container">
        {results.items.map(res => { 
            let updated = res.updated_at.replace(/[A-Z]/g, " ")
            let language 
            switch(res.language) {
                case "HTML":
                language=<FontAwesomeIcon icon={faHtml5} style={{fontSize:"1.5em"}} />
                break;
                case "CSS":
                language=<FontAwesomeIcon icon={faCss3} style={{fontSize:"1.5em"}} />
                break;
                case "Java":
                language=<FontAwesomeIcon icon={faJava} style={{fontSize:"1.5em"}} />
                break;
                case "JavaScript":
                language=<FontAwesomeIcon icon={faJs} style={{fontSize:"1.5em"}} />
                break;
                case "Python":
                language=<FontAwesomeIcon icon={faPython} style={{fontSize:"1.5em"}}/>
                break;
                case "C++":
                language=<Icon icon={bxlCPlusPlus} style={{fontSize:"2em"}}/>
                break;
                case "TypeScript":
                language=<Icon icon={typescriptIcon} style={{fontSize:"1.5em"}} />
                break;
                case "PHP": 
                language=<FontAwesomeIcon icon={faPhp} style={{fontSize:"1.5em"}}/>
                break;
                default: language = res.language
            }

            return (
            <div className="git-repos-div">
                <h4 className="git-repos-name">{res.full_name}</h4>
                <p className="git-repos-language"><span style={{fontStyle: "italic", color:"#5a5b5c"}}>Language: </span>{language}</p>
                <p className="git-repos-license"><span style={{fontStyle: "italic", color:"#5a5b5c"}}>License: </span> {res.license === null ? "No license" : res.license.name}</p>
                <p className="git-repos-update"><span style={{fontStyle: "italic", color:"#5a5b5c"}}>Last update at: </span> {updated} </p>
                <div className="git-repos-numbers">
                    <p className="git-repos-stars"><FontAwesomeIcon icon={faStar} /> {res.stargazers_count}</p>
                    <p className="git-repos-forks"><FontAwesomeIcon icon={faCodeBranch} />  {res.forks_count}</p>
                    <p className="git-repos-issues"><FontAwesomeIcon icon={faExclamationCircle} /> {res.open_issues_count}</p>
                </div>                
            </div>
            )})}
        </div>
        )
        } else if (results.items === undefined && loaded) {
            return (
                <div style={{height: "80vh"}}>
                    <h4 style={{textAlign:"center"}}>Error: Too many requests. Github limit is 10 requests per minute. </h4>
                </div>
            )
        }
        
    }

    useEffect(()=>{
        renderResults()
        setPageCounter(page)
    }, [results, sort])

    const pageDown = () => {
        page > 1 && setPage(page - 1)
        console.log(page)
    }
    const pageUp = () => {
        page < totalPages && setPage(page + 1)
        console.log(page)
    }



    return (
        <div>
            <h4 style={{textAlign:"center", margin:"0.5em 0"}}>Listing repos of <span style={{textDecoration: "underline"}}>{id}</span></h4>
            <div style={{margin:"1em 0"}} className="git-repos-btn-group-div" >
            <h3 className="git-repos-btn-group-text">Sort by:</h3>
                <ButtonGroup className="git-repos-btn-group" label="Sort by:" >
                    <Button variant={sort === "stars" ? "secondary" : "primary"} onClick={() => setSort("stars")}>Stars</Button>
                    <Button variant={sort === "forks" ? "secondary" : "primary"} onClick={() => setSort("forks")}>Forks</Button>
                    <Button variant={sort === "update" ? "secondary" : "primary"} onClick={() => setSort("update")}>Last Update</Button>
                </ButtonGroup>
            </div>

            {renderResults()}
            
            <div className="git-repos-userpages-div">
                <Button className="git-repos-userpages-left" variant="primary" onClick={() => pageDown()}>&lt;</Button>
                
                <Form.Control placeholder={`${page}`} className="git-repos-userpages-number" type="number" min="1" max={totalPages} value={pageCounter} onChange={e => setPageCounter(e.target.value)} />
                <Button className="git-repos-userpages-go" variant="primary" onClick={() => setPage(pageCounter)}>Go</Button>
                
                <Button className="git-repos-userpages-right" variant="primary" onClick={() => pageUp()}>&gt;</Button>
            </div>

        </div>
    )
}

export default Repos