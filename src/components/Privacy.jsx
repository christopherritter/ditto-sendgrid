import React, { useEffect } from "react";

function Privacy() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <h2>Privacy Policy</h2>

      <p>
        Christopher Ritter ("he", "him", or "his") operates the
        http://www.maskrequired.net website (the "Service").
      </p>

      <p>
        This page informs you of the policies regarding the collection, use and
        disclosure of Personal Information when you use the Service.
      </p>

      <p>
        He will not use or share your information with anyone except as
        described in this Privacy Policy.
      </p>

      <p>
        He uses your Personal Information for providing and improving the
        Service. By using the Service, you agree to the collection and use of
        information in accordance with this policy. Unless otherwise defined in
        this Privacy Policy, terms used in this Privacy Policy have the same
        meanings as in our Terms and Conditions, accessible at
        http://www.maskrequired.net.
      </p>

      <h3>Information Collection And Use</h3>

      <p>
        While using the Service, he may ask you to provide certain personally
        identifiable information that can be used to contact or identify you.
        Personally identifiable information may include, but is not limited to,
        your email address, other information ("Personal Information").
      </p>

      <h3>Log Data</h3>

      <p>
        He collects information that your browser sends whenever you visit the
        Service ("Log Data"). This Log Data may include information such as your
        computer's Internet Protocol ("IP") address, browser type, browser
        version, the pages of our Service that you visit, the time and date of
        your visit, the time spent on those pages and other statistics.
      </p>

      <p>
        In addition, he may use third party services such as Google Analytics
        that collect, monitor and analyze this type of information in order to
        increase our Service's functionality. These third party service
        providers have their own privacy policies addressing how they use such
        information.
      </p>

      <h3>Cookies</h3>

      <p>
        Cookies are files with small amount of data, which may include an
        anonymous unique identifier. Cookies are sent to your browser from a web
        site and stored on your computer's hard drive.
      </p>

      <p>
        You can prevent the installation of cookies by adjusting the settings in
        your browser software accordingly; please note though that you may not
        be able to use all the features of MaskRequired.net in full as a result.
        Google also offers so-called deactivation tools for some web browsers,
        where you can opt out of your user behavior being recorded and analyzed.
        You will find more information and download options for these tools
        here: http://tools.google.com/dlpage/gaoptout?hl=en-GB
      </p>

      {/* <h3>Service Providers</h3>

<p>
  We may employ third party companies and individuals to facilitate
  our Service, to provide the Service on our behalf, to perform
  Service-related services or to assist us in analyzing how our
  Service is used.
</p>

<p>
  These third parties have access to your Personal Information only to
  perform these tasks on our behalf and are obligated not to disclose
  or use it for any other purpose.
</p> */}

      {/* <h3>Communications</h3>

<p>
  We may use your Personal Information to contact you with
  newsletters, marketing or promotional materials and other
  information that may be of interest to you. You may opt out of
  receiving any, or all, of these communications from us by following
  the unsubscribe link or instructions provided in any email we send.
</p> */}

      <h3>Security</h3>

      <p>
        The security of your Personal Information is important to him, but
        remember that no method of transmission over the Internet, or method of
        electronic storage is 100% secure. While he strives to use commercially
        acceptable means to protect your Personal Information, he cannot
        guarantee its absolute security.
      </p>

      {/* <h3>International Transfer</h3>

<p>
  Your information, including Personal Information, may be transferred
  to — and maintained on — computers located outside of your state,
  province, country or other governmental jurisdiction where the data
  protection laws may differ than those from your jurisdiction.
</p>

<p>
  If you are located outside India and choose to provide information
  to us, please note that we transfer the information, including
  Personal Information, to India and process it there.
</p>

<p>
  Your consent to this Privacy Policy followed by your submission of
  such information represents your agreement to that transfer.
</p> */}

      <h3>Links To Other Sites</h3>

      <p>
        The Service may contain links to other sites that are not operated by
        him. If you click on a third party link, you will be directed to that
        third party's site. He strongly advises you to review the Privacy Policy
        of every site you visit.
      </p>

      <p>
        He has no control over, and assume no responsibility for the content,
        privacy policies or practices of any third party sites or services.
      </p>

      <h3>Children's Privacy</h3>

      <p>
        The Service does not address anyone under the age of 13 ("Children").
      </p>

      <p>
        He do not knowingly collect personally identifiable information from
        children under 13. If you are a parent or guardian and you are aware
        that your Children has provided him with Personal Information, please
        contact him. If he becomes aware that he has collected Personal
        Information from a children under age 13 without verification of
        parental consent, he will take steps to remove that information from his
        servers.
      </p>

      <h3>Changes To This Privacy Policy</h3>

      {/* <p>
  We may update our Privacy Policy from time to time. We will notify
  you of any changes by posting the new Privacy Policy on this page.
</p> */}

      <p>
        You are advised to review this Privacy Policy periodically for any
        changes. Changes to this Privacy Policy are effective when they are
        posted on this page.
      </p>

      <h3>Contact Us</h3>

      <p>
        If you have any questions about this Privacy Policy, please contact him
        at maskrequired[at]christopherritter.com.
      </p>
    </div>
  );
}

export default Privacy;
