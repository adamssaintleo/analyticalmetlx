package bootstrap.liftweb

import _root_.net.liftweb.util._
import Helpers._
import _root_.net.liftweb.common._
import _root_.net.liftweb.http._
import _root_.net.liftweb.http.rest._
import _root_.net.liftweb.http.provider._
import _root_.net.liftweb.sitemap._
import _root_.net.liftweb.sitemap.Loc._
import com.metl.snippet._
import com.metl.view._
import com.metl.model._

object Boot{
  val ninetyDays = 60*60*24*90
  val cacheStrongly = List(
    ("Cache-Control","public, max-age=%s".format(ninetyDays)),
    ("Pragma","public")
  )
}

class Boot {
  def boot {
    println("Boot begins")
    LiftRules.addToPackages("com.metl")

    LiftRules.allowParallelSnippets.session.set(true)
    LiftRules.maxConcurrentRequests.session.set((r:Req)=>1000)

    LiftRules.cometRequestTimeout = Full(25)

    println("Config begins")
    // this starts up our system - populates serverConfigurations, attaches CAS, attaches RestHelpers, etc.
    MeTLXConfiguration.initializeSystem
    println("Routing begins")
    val defaultHeaders = LiftRules.defaultHeaders
    LiftRules.defaultHeaders = {
      case (_, Req("static"::"js"::"stable"::_, _, _)) => Boot.cacheStrongly
      case (_, Req("proxyDataUri"::_, _, _)) => Boot.cacheStrongly
      case (_, Req("proxy"::_, _, _)) => Boot.cacheStrongly
      case any => defaultHeaders(any)
    }

    LiftRules.passNotFoundToChain = false
    LiftRules.uriNotFound.prepend {
      case (Req("static":: rest,_,_),failure) => {
        println("staticResource uriNotFound: %s".format(rest))
        DefaultNotFound
      }
      case _ => NotFoundAsResponse(RedirectResponse("/"))
    }

    def sitemap() = SiteMap(
      //2011 piggyback auth
      Menu(Loc("Authentication",Link("authenticationState" :: Nil,true,"/authenticationState"),"Authentication",Hidden)),
      Menu.i("menu.saml") / "saml-callback" >> Hidden,
      //Widget
      Menu(Loc("Analytical widget","widget" :: Nil,"Widgets")),
      //FutureMeTL
      Menu(Loc("Future","future" :: Nil,"Future MeTL")),
      //MeTLX
      Menu(Loc("Home","index" :: Nil,"Home")),
      Menu(Loc("MeTL Viewer","metlviewer" :: Nil,"MeTL Viewer")),
      Menu(Loc("Board","board" :: Nil,"MeTL X")),
      Menu(Loc("Summaries","summaries" :: Nil,"Analytics")),
      //WebMeTL
      Menu(Loc("Conversation","conversation" :: Nil,"Conversation",Hidden)),
      Menu(Loc("Slide","slide" :: Nil,"Slide",Hidden)),
      Menu(Loc("SlidePrev","slidePrev" :: Nil,"Previous Slide",Hidden)),
      Menu(Loc("SlideNext","slideNext" :: Nil,"Next Slide",Hidden)),
      Menu(Loc("SlideNavigation","slideNavigation" :: Nil,"Slide Navigation",Hidden)),
      Menu(Loc("SlideTitle","slideTitle" :: Nil,"Slide Title",Hidden)),
      Menu(Loc("Quiz","quiz" :: Nil,"Quiz",Hidden)),
      Menu(Loc("Quizzes","quizzes" :: Nil,"Quizzes",Hidden)),
      //Default
      Menu(Loc("Static", Link(List("static"), true, "/static/index"), "Static Content", Hidden)))

    LiftRules.setSiteMapFunc(() => sitemap())

    LiftRules.loggedInTest = Full(() => true)
    println("Boot ends")
  }
}
