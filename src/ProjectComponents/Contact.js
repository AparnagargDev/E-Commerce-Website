function Contact()
{
    return(
        <>
        <div class="ccontainer">
<div class="main">
<div class="contact">				
					
      				
				  <div class="contact-form">
			 	  	 	<h2>Contact Us</h2>
			 	 	    <form method="post" action="contact-post.html">
					    	<div>
						    	
						    	<span>Name<input name="userName" type="text"   class="textbox"/></span>
						    </div>
						    <div>
						    	
						    	<span>Email<input name="userEmail" type="text" class="textbox"/></span>
						    </div>
						    <div>
						     	
						    	<span>Mobile<input name="userPhone" type="text" class="textbox"/></span>
						    </div>
						    
						    	
						    	Subject<textarea  type="text" placeholder="Subject" class="textbox" name="userMsg"> </textarea>
						    
						   <div>
						   		<input type="submit" class="" value="Submit us"/>
						  </div>
					    </form>
				    </div>
                    </div>
                    </div>
                    </div>
        </>
    )
}
export default Contact;