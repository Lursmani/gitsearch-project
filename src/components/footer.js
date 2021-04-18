import React from 'react'
import "./headfoot.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faGithubSquare, faLinkedin} from "@fortawesome/free-brands-svg-icons"
import {faLink} from "@fortawesome/free-solid-svg-icons"


export default function Footer() {
    return (
        <div className="footer">
            <h5 className="gitproject-footer-text">Made by Davit Lursmanashvili</h5>
            <p className="gitproject-footer-link"><FontAwesomeIcon icon={faLink} /> <a href="daveyloper.com" alt="My website">Daveyloper.com</a> </p>
            <p className="gitproject-footer-link"><FontAwesomeIcon icon={faLinkedin} /> <a href="https://www.linkedin.com/in/davit-lursmanashvili/">Davit Lursmanashvili</a> </p>
            <p className="gitproject-footer-link"><FontAwesomeIcon icon={faGithubSquare} /> <a href="https://github.com/Lursmani">Lursmani</a> </p>
        </div>
    )
}
