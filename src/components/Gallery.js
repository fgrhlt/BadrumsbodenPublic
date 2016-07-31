import React, { Component } from 'react'
require('normalize.css/normalize.css')
require('styles/Main.css')
require('styles/Gallery.css')

export default class Gallery extends Component {
  render() {
    return (
      <div>
        <div id="header">
            <div id="left">
              <span>
                <img src="images/arrows/small_backarrow.svg" />
                Tillbaka till portalen
              </span>

              <img id="logo" src="images/logo/logo_small.svg" />
            </div>

            <div id="right">
              <div>
                <img src="images/icons/email_icon.svg" />
                <h4>E-post</h4>
                Klicka för att skicka epost
              </div>

              <div>
                <img src="images/icons/phone_icon.svg" />
                <div className="text">
                  070 57 43 373<br />
                  <span>Öppet 08-18</span>
                  </div>
              </div>
            </div>

            <div id="text">
            We identify four legitimate reasons why well-intentioned content creators
feel compelled to overload their slides with text. Some are easy to resolve,
others not so easy—and in all cases, the text creates one of the most insidious
barriers to a presenter being able to connect with his or her audience.
Here, for your reading enjoyment, are The Four Reasons Why Excessive
Text Can Ruin Your Day.
1. You do not know any better
We spoke about this way back in Chapter 1 when we sketched one of the
typical profiles of the PowerPoint user: the person who comes to the software
from other Office apps and has no idea that a quick copy-and-paste
from Word could lead to Death by PowerPoint.
If this is you, you’re easy. You have not yet formed a multitude of bad habits.
You simply followed your instincts and thought that the stuff you wrote
in Word would work as well in PowerPoint. You simply need to learn about
the foundation of <div id="link">what makes for good presentation content, and with few
preconceived notions already in place, that training would likely go quickly
and without trauma.</div>
You are the easiest to address. You create slides like the one in Figure 16.1
(repeated from Chapter 2) because that is the only way you have known
how to tell a story or deliver a message. You don’t have bad habits; you have
no habits, and that is a much better thing.
154 Why Most PowerPoint Presentations Suck
Figure 16.1
A person with no
experience
whatsoever with
presentation
design is liable to
overcreate his or
her slides.
2. You are addicted
Your situation is more complicated than the person who simply doesn’t
know any better. You might very well know better, but you cannot help
yourself. You do not feel comfortable unless everything you want to say is
displayed before you. You don’t believe you can function...you become paralyzed...you
feel naked. Without your safety net of a fully-composed script
being projected before you, you lose your composure and your poise.
Figure 16.2 will look familiar to those who read Chapter 13. It is the quintessential
poster child for the too-much-text syndrome. My conversations
with the client who created this slide were, all at once, educational, amusing,
exasperating, and telling:
Me: Why do you want all of that text on the screen?
Him: I just feel more
comfortable with it.
Me: What if we kept all
of the high-level ideas but
removed the detail?
Him: That woul
            </div>
        </div>

      </div>
    )
  }
}

Gallery.defaultProps = {
}
