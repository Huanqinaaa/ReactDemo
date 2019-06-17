
require("./header.css");
require('../lib/swiper.min.css');
let Swiper = require('../lib/swiper.min.js');
let jsonp = require('../util/jsonp.js');

import React from 'react';     

let Header = React.createClass({
	getInitialState: function() {
        return {
        	imgUrls: [],
        };
 	},
	componentDidMount: function() {
		jsonp(this.props.source, "", "callback", (data) => {
			if(data.status) {
				if(this.isMounted()) {
					this.setState({
						imgUrls: data.data,
					})
				    new Swiper ('#header .swiper-container', {
					    loop: true,
					    pagination: '.swiper-pagination',
					    paginationClickable: true,
					    autoplay : 3000,
						autoplayDisableOnInteraction : false,		    
					}) 
				}	
			}else {
				alert(data.msg);
			}
		}); 
	},

	render: function () {
		let countId = 0;
	    return (
	      <div id="header">
    		<div className="swiper-container">
			    <div className="swiper-wrapper">
			    	{
			    		this.state.imgUrls.map((url) => {
			    			return <div className="swiper-slide" key={"header" + countId++} >
			    						<img className="img" src={url} />
			    				   </div>
			    		})
			    	}
			    </div>
				<div className="swiper-pagination"></div>
			</div>
	      </div>
	    );
	  }
})

module.exports = Header;

