import { makeStyles, Theme } from '@material-ui/core';
import React, { FC } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  ol: {
    counterReset: 'item',
    paddingLeft: theme.spacing(4),
  },
  li: {
    display: 'block',
    marginBottom: theme.spacing(2),

    '&:before': {
      content: 'counters(item, ".") ".  "',
      counterIncrement: 'item',
    },
  },
  link: {
    color: theme.palette.primary.main,
  },
}));

const TermsContent: FC = () => {
  const classes = useStyles();
  return (
    <>
      <p>
        These Terms of Use (<b>“Terms”</b>) are entered into between You, or if
        you are accessing or using Moove’s Offerings on behalf of another
        individual or entity (<b>“Entity”</b>), that Entity (in either case,
        <b>“You”</b> or <b>“Your”</b>) and Moove.ai, LLC (<b>“Moove”</b>) and,
        together with the terms of Your Order, govern all access to and use of
        the Offerings set forth in Your Order.
      </p>
      <p>
        Moove’s Offerings consist of: (1) a hosted software platform, which
        provides road safety insights based on digital transportation data (the{' '}
        <b>“Platform”</b>); (2) certain road safety datasets (
        <b>“Moove Data”</b>); and (3) other offerings and services (
        <b>“Services”</b>, and collectively with the Platform and Moove Data,{' '}
        <b>“Offerings”</b>). You may submit an online order (<b>“Order”</b>) for
        the Offerings You wish to access and use through Moove’s website, at{' '}
        <a className={classes.link} href="//moove.ai">
          https://moove.ai/
        </a>
        , by selecting Your desired Offerings, proceeding to checkout, and
        clicking “I agree” to the terms of the Order and these Terms.
      </p>
      <p>
        By submitting Your Order and clicking “I agree”, You agree to enter into
        and be bound by these Terms and the terms of Your Order (collectively,
        this <b>“Agreement”</b>). If You are entering into this Agreement on
        behalf of an Entity, You represent and warrant that you have authority
        to bind that Entity to the terms of this Agreement. If you do not have
        such authority, or you do not agree to be bound by this Agreement, do
        click “I agree”.
      </p>
      <ol className={classes.ol}>
        <li className={classes.li}>
          <b>Definitions</b>. All capitalized terms used in this Agreement and
          defined in the context in which they are used will have the meanings
          given to them herein. All other terms used in this Agreement will have
          their plain English (U.S.) meaning.
        </li>
        <li className={classes.li}>
          <b>Term</b>. This Agreement begins on the date You submit an Order and
          click “I agree” (the “Effective Date”). This Agreement will continue
          in effect for the initial term stated in the Order (the “Initial
          Term”), and will automatically renew for successive terms of equal
          length (each a “Renewal Term”) unless, (1) either party provides
          termination notice 30 days prior to the end of the Initial Term or
          then-current Renewal Term, or (2) this Agreement is terminated in
          accordance with its terms.
        </li>
        <li className={classes.li}>
          <b>Orders</b>. These Terms are incorporated into each Order You place
          for any Moove Offerings. To the extent of any conflict between these
          Terms and an Order, these Terms will control. All Orders are
          non-cancellable once made.
        </li>
        <li className={classes.li}>
          <b>ACCESS</b>
          <ol className={classes.ol}>
            <li className={classes.li}>
              <b>To Free Offerings.</b>Moove may provide You the ability to
              access and use certain Platform features and functionality and/or
              certain Moove Data free of charge (the “Free Offerings”) in
              accordance with the terms below. Neither the provision of any Free
              Offerings, nor this Agreement, creates any obligation for Moove to
              provide You, or to continue providing You, any Free Offerings. You
              acknowledge and agree that You have no recourse against Moove for
              any losses related to any modification or termination of any Free
              Offerings.
            </li>
            <li className={classes.li}>
              <b>To the Platform.</b> If an Order provides for access to Moove’s
              hosted platform, which allows users to obtain road safety insights
              based on digital transportation data (the “Platform”), then,
              subject to the terms of this Agreement, during the term of the
              Order, Moove will provide You a limited, non-exclusive,
              non-transferable, non-sublicensable right to access and use those
              features and functionality of the Platform (including those Moove
              Data) set forth in the Order solely for the purpose set forth in
              the Order, or if no purpose is set forth in Your Order, for Your
              internal business purposes.
            </li>
            <li className={classes.li}>
              <b>To Your Account.</b> Access to and use of the Platform will be
              through an account You create on the Platform (“Account”). Your
              Account and the identification and password associated with Your
              Account (the “Account ID”) are both personal in nature and may be
              used by You alone. You will ensure the security and
              confidentiality of Your Account ID and will prevent unauthorized
              access to or use of the Platform through Your Account ID. In the
              event of any such unauthorized access or use of the Platform or if
              Your Account ID is lost, stolen, or otherwise compromised, you
              agree to promptly (a) change your Account ID and (b) notify Moove.
            </li>
            <li className={classes.li}>
              <b>To Moove Data.</b> If an Order provides for access to Moove
              Data off the Platform, for instance through an application
              programming interface (“API”) or other mechanism, then, subject to
              the terms of this Agreement, during the term of the Order, Moove
              will provide You a limited, non-exclusive, non-transferrable,
              non-sublicensable right to access the Moove Data specified in the
              Order solely through Moove’s designated API or other mechanism
              (unless otherwise stated in the Order) solely for the for the
              purpose set forth in the Order, or if no purpose is set forth in
              Your Order, for Your internal business purposes. You agree to
              protect any Moove Data in your possession or control from and
              against any accidental, unauthorized, or unlawful use, access, or
              disclosure or processing. In furtherance of the foregoing, You
              agree to implement and maintain reasonable and appropriate
              administrative, technical, and physical safeguards and measures to
              ensure the security and confidentiality of any Moove Data in Your
              possession or control, including any safeguards required by
              applicable laws, rules, regulations, and contractual obligations.
            </li>
          </ol>
        </li>
        <li className={classes.li}>
          <b>Restrictions.</b> You acknowledges that the Moove’s Offerings, and
          all APIs, software, hardware, data, datasets, information, and other
          technology used by or on behalf of Moove to provide such Offerings
          (collectively the “Technology”), constitute the valuable IPR of Moove.
          As an express condition to the rights granted to You under this
          Agreement, and in addition to the other conditions in this Agreement,
          You will not and will not permit any third party to: (1) use or access
          any Technology or any portion thereof, except as expressly provided in
          this Agreement; (2) modify, adapt, alter, revise, translate, or create
          derivatives (including derivative works) from any Technology; (3)
          sublicense, distribute, sell, convey, assign, pledge, or otherwise
          transfer or in any way encumber any Technology or any portion thereof;
          (4) use any Technology for the benefit of any third party or make any
          Technology available to any third party; (5) reverse engineer,
          decompile, disassemble, or otherwise attempt to derive the source
          code, structure, design, or method of operation for any Technology;
          (6) circumvent or overcome (or attempt to circumvent or overcome) any
          technological protection measures intended to restrict access to any
          portion of the Platform, Moove Data, or any other Technology; (7)
          access or utilize any Technology for any purpose that is illegal in
          any way or that advocates illegal activity; (8) interfere in any
          manner with the operation or hosting of any Technology or attempt to
          gain unauthorized access to any Technology; (9) alter, obscure or
          remove any copyright notice, copyright management information or
          proprietary legend contained in or on any Technology; (10) download,
          capture, extract, or otherwise remove any Moove Data from the
          Platform, unless specifically authorized in writing by Moove; (12)
          access, use or analyze any Moove Data outside the Platform, unless
          specifically authorized in writing by Moove; (13) combine, merge,
          link, or layer any Moove Data with any other datasets, whether or not
          provided by Moove, unless specifically authorized in writing by Moove;
          (14) re-identify or attempt to re-identify any individual person,
          vehicle, or device using any Technology; or (15) use any Moove Data
          for any of the following purposes: (a) surveillance or tracking to
          identify (or attempt to identify), observe, or monitor a unique
          individual or unique vehicle; (b) military, defense, or law
          enforcement; (c) any purpose that undermines the safety, privacy, or
          security of vehicles or individuals; (d) politics; or (e)
          discrimination against any individual or group. All use of all
          Technology will be in accordance with any documentation for the
          applicable Technology provided by Moove. As used in this Agreement,
          “IPR” means any and all intellectual property and proprietary rights
          throughout the world, including all copyrights, trademarks, service
          marks, trade secrets, patents (and patent applications), moral rights,
          rights in data and databases, contract rights, and any other legal
          rights protecting data or information. All rights and restrictions in
          this Agreement applicable to any Moove Data apply to all data,
          information, and other elements comprising the Moove Data, including
          any enhancements, corrections, or other updates provided by Moove from
          time to time. Except as expressly stated in Section 4, Moove grants
          You no rights or licenses in or to the Technology, whether by
          implication, estoppel, or otherwise.
        </li>
        <li className={classes.li}>
          <b>Support, Maintenance, and Other Services</b>. Moove will provide
          support, maintenance and other Services solely as specified in Orders
          under this Agreement or under a separate written agreement between the
          parties. Except as may be specified in an Order, or such a separate
          agreement, Moove is under no obligation to provide You with support,
          maintenance or other Services. Notwithstanding the foregoing, should
          Moove provide You with any support, maintenance or other Services, any
          such support, maintenance or other Services will be subject to the
          terms specified in the Order and Moove’s then-current terms for
          support, maintenance or other Services, as applicable.
        </li>
        <li className={classes.li}>
          <b>Fees and Payment.</b>
          <ol className={classes.ol}>
            <li className={classes.li}>
              Unless You are only accessing the Free Offerings, You shall pay
              the fees specified in Your Order (“Fees”) as and when due. All
              recurring Fees will be due and payable by You in advance of the
              Initial Period and each applicable Renewal Period under this
              Agreement unless other payment terms have been extended by Moove.
              All other Fees will be due and payable as indicated by Moove.
              Moove may increase the Fees for any Renewal Term, effective upon
              such renewal, by providing You notice at least 45 days prior to
              the end of the Initial Term or then-current Renewal Term.
            </li>
            <li className={classes.li}>
              If You specify a credit card, debit card, online payment account,
              mobile services account, or other payment method as an applicable
              payment mechanism under this Agreement, You hereby grant Moove the
              right to charge the applicable payment account You provided to
              Moove for all Fees incurred under this Agreement. All Fees will be
              non-refundable once paid to Moove (including upon any termination
              or suspension of this Agreement).
            </li>
            <li className={classes.li}>
              Until paid in full, all past due amounts will bear an additional
              charge of the lesser of 1½% per month or the maximum amount
              permitted under applicable law. If Moove requires use of
              collection agencies, attorneys, or courts of law for collection of
              Your account, You will be responsible for those expenses. You will
              be responsible for any and all use, sales, and other taxes imposed
              on the Offerings provided under this Agreement.
            </li>
          </ol>
        </li>
        <li className={classes.li}>
          <b>Ownership and Rights.</b>
          <ol className={classes.ol}>
            <li className={classes.li}>
              <b>Moove</b>. Moove and its licensors own and will continue to
              retain all right, title, and interest in and to (a) all
              Technology, (b) with the exception of Your Data, all Moove Data
              and any other information, data, datasets (including the
              structure, organization, selection, coordination, and arrangement
              thereof), content, reports and other materials, generated on the
              Platform or otherwise provided by or on behalf of Moove; (c) any
              updates, upgrades, new versions, modifications, or enhancements to
              any of the foregoing, and (e) all IPR in and relating to each of
              the foregoing. Except as set forth in this Agreement, You are
              granted no licenses or rights in or to any Technology, or any IPR
              therein or related thereto.
            </li>
            <li className={classes.li}>
              <b>Client</b>. As between You and Moove, all data, datasets, and
              other information You or Your representatives provide to Moove
              (“Client Data”), is owned by You and Your respective licensors.
              You represent, warrant, and covenant, that (a) You have and will
              maintain all necessary consents, permissions, and rights necessary
              to provide Moove with Your Data and for Moove to use Your Data as
              permitted under this Agreement; and (b) unless specified in Your
              Order, You shall not provide to Moove, any Personal Data, or any
              data covered by the Health Insurance Portability and
              Accountability Act, Gramm-Leach-Bliley Act, or Family Educational
              Rights and Privacy Act. You are solely responsible for, and
              assumes all risks associated with all Your Data, including
              processing through the Platform. Moove is under no obligation to
              review any of Your Data, but Moove has the right to review any of
              Your Data and to take appropriate action, including removal or
              modification of Your Data or suspension of Your Account, if deemed
              necessary by Moove to prevent any damage, injury, or harm to
              Moove, the Technology, any Moove client, or any third party. Moove
              will not be responsible or liable for any deletion, destruction,
              or loss of any of Your Data and You are solely responsible for
              creating and maintaining adequate backups of Your Data, as You may
              deem reasonable. You acknowledge that certain of Your Data may be
              available from other sources, and nothing in this Agreement shall
              limit Moove’s rights as to data or information obtained from any
              source other than You. You grant to Moove a nonexclusive,
              royalty-free, fully paid, worldwide license to utilize all Your
              Data as necessary for the purpose of performing Moove’s
              obligations under this Agreement. You further authorize Moove to
              aggregate Your Data in de-identified form with data from other
              Moove clients and third parties in a manner that does not identify
              You or include any information that identifies or, in combination
              with other data, could reasonably be used to identify, a natural
              person (“Personal Data”). For clarity, (i) once de-identified and
              aggregated, the data will no longer be “Your Data” and may be used
              by Moove for any purpose and (ii) unless otherwise agreed, Moove
              will only use Personal Data contained in the Your Data to provide
              the Offerings.
            </li>
            <li className={classes.li}>
              <b>Names & Logos.</b> The names, logos, and other trademarks and
              service marks of each party are and will remain the property of
              each party. During the term, Moove may include Your name and logo
              in Moove’s standard marketing materials and customer lists.
            </li>
          </ol>
        </li>
        <li className={classes.li}>
          <b>Termination and Effect.</b>
          <ol className={classes.ol}>
            <li className={classes.li}>
              <b>Termination.</b> Either party may terminate this Agreement at
              any time upon written notice to the other party if the other party
              materially breaches any provision of this Agreement and fails to
              cure such breach (if curable) within 30 days after receiving
              notice thereof from the non-breaching party.
            </li>
            <li className={classes.li}>
              <b>Effect of Termination.</b> Termination of this Agreement will
              not relieve either party of any rights or obligations accruing
              prior to such termination. Upon any termination of this Agreement:
              (a) all Fees owed under this Agreement prior to such termination
              will be immediately due and payable (including, at minimum, the
              Fees due under this Agreement pro-rated based on Offerings
              provided by Moove prior to termination and any Fees attributable
              to non-cancelable commitments entered into by Moove prior to such
              termination); (b) Moove may cease providing all access to the
              Offerings under this Agreement; (c) all rights and licenses
              granted to You with respect to any Offerings under this Agreement
              will terminate and You will cease all access and use of the
              Technology provided under this Agreement; and (d) except as may be
              expressly permitted under this Agreement, each party will return
              to the other party or, at the option of the other party,
              permanently destroy any Confidential Information of the other
              party in such party’s possession or control, including any Moove
              Data. At the request of the other party, each party will certify
              in writing to its compliance with this Section.
            </li>
            <li className={classes.li}>
              <b>Survival.</b> The following Sections will survive termination
              of this Agreement for any reason: 1, 3, 5, 7, 8, 9.2, 9.3, 11, 12,
              13, 14, 15, 16, 17, 18, 19, 20, and 22.
            </li>
          </ol>
        </li>
        <li className={classes.li}>
          <b>Suspension.</b> Without limiting Moove’s right to terminate this
          Agreement, Moove may suspend Your access to the Offerings or convert
          Your Offerings to Free Offerings, upon Your breach or suspected breach
          of this Agreement or if deemed necessary by Moove to prevent damage,
          injury, or harm to Moove, the Offerings, any Moove customer, or any
          third party. In each case, Moove will reinstate Your Offerings when
          Moove determines that You are in full compliance with the terms of
          this Agreement and/or that such threat has been addressed.
        </li>
        <li className={classes.li}>
          <b>Your Additional Commitments.</b> You represent, warrant and
          covenant to Moove that: (1) You have full power and authority to enter
          into this Agreement; (2) this Agreement will not conflict with, result
          in a breach of, or constitute a default under any other agreement to
          which You are a party or by which You are bound; (3) this Agreement is
          a legal and valid obligation binding upon You and enforceable in
          accordance with its terms; (4) You will comply with all laws, rules,
          and regulations (“Laws”) applicable to Your performance under this
          Agreement; and (5) Your performance under this Agreement will not
          cause Moove to violate any applicable Laws.
        </li>
        <li className={classes.li}>
          <b>Disclaimer.</b> YOU ACKNOWLEDGE THAT THE OFFERINGS ARE PROVIDED BY
          MOOVE AND its LICENSORS “AS IS”, “AS AVAILABLE”, “WITH ALL DEFECTS”,
          AND WITHOUT ANY REPRESENTATIONS, WARRANTIES OR COVENANTS OF ANY KIND.
          MOOVE EXPRESSLY DISCLAIMS, AND YOU DISCLAIM ANY RELIANCE UPON, ALL
          REPRESENTATIONS, WARRANTIES AND COVENANTS, WHETHER EXPRESSED OR
          IMPLIED, REGARDING THIS AGREEMENT AND any OFFERING, INCLUDING ANY
          IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE, TITLE, NONINFRINGEMENT, DATA ACCURACY, TITLE,
          NON-INFRINGEMENT, NON-INTERFERENCE AND/OR QUIET ENJOYMENT. MOOVE DOES
          NOT WARRANT THAT THE OFFERINGS WILL MEET YOUR REQUIREMENTS OR THAT THE
          OFFERINGS WILL BE UNINTERRUPTED OR ERROR-FREE, OR THAT ALL OR ANY
          ERRORS WILL BE CORRECTED. MOOVE WILL NOT BE RESPONSIBLE FOR ANY LOSS
          OR DAMAGE TO ANY DATA, INCLUDING YOUR DATA, OR FOR YOUR RELIANCE UPON
          ANY OFFERINGS. NO ORAL OR WRITTEN INFORMATION OR ADVICE GIVEN BY MOOVE
          OR ITS AGENTS OR REPRESENTATIVES WILL CREATE ANY REPRESENTATIONS,
          WARRANTIES OR COVENANTS UNLESS CONFIRMED IN WRITING BY MOOVE AS AN
          AMENDMENT TO THIS AGREEMENT.
        </li>
        <li className={classes.li}>
          <b>Indemnification.</b> You hereby agree to indemnify, defend, and
          hold harmless Moove and its members, officers, directors,
          shareholders, affiliates, employees, agents, contractors, assigns,
          customers, providers, licensees, and successors in interest
          (“Indemnified Parties”) from any and all claims, losses, liabilities,
          damages, fees, expenses and costs (including attorneys&apos; fees,
          court costs, damage awards, and settlement amounts) that result from
          any claim or allegation against any Indemnified Party arising in any
          manner from: (1) Your access to or use of the Offerings, including any
          Moove Data; (2) Your Data; and (3) Your breach of any representation,
          warranty, or other provision of this Agreement. Moove will provide You
          with notice of any such claim or allegation, and Moove will have the
          right to participate in the defense of any such claim at its expense.
        </li>
        <li className={classes.li}>
          <b>Limitation of Liability.</b> MOOVE will not BE LIABLE TO YOU OR ANY
          THIRD PARTY FOR ANY LOST DATA, LOST PROFITS, LOST OPPORTUNITIES,
          BUSINESS INTERUPTION, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, OR
          FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY OR CONSEQUENTIAL
          DAMAGES, HOWEVER CAUSED, UNDER ANY THEORY OF LIABILITY, WHETHER IN
          CONTRACT, STRICT LIABILITY OR TORT (INCLUDING NEGLIGENCE OR
          OTHERWISE), ARISING IN CONNECTION WITH OR OUT OF THE USE OF THE
          OFFERINGS, EVEN IF MOOVE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH
          DAMAGES. MOOVE’S TOTAL CUMULATIVE LIABILITY IN CONNECTION WITH THIS
          AGREEMENT and its provision of the OFFERINGS, WHETHER IN CONTRACT OR
          TORT OR OTHERWISE, WILL NOT EXCEED THE GREATER OF (1) AMOUNTS YOU
          ACTUALLY PAID TO MOOVE FOR USE OF THE OFFERINGS IN THE PRECEDING 3
          MONTHS OR (2) $100. You agree THAT MOOVE WOULD NOT ENTER INTO THIS
          AGREEMENT WITHOUT THESE LIMITATIONS ON ITS LIABILITY. IN JURISDICTIONS
          WHERE LIMITing LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES IS
          NOT PERMITTED, MOOVE’S LIABILITY IS LIMITED TO THE MAXIMUM EXTENT
          PERMITTED BY LAW. ALL CLAIMS BY EITHER PARTY AGAINST THE OTHER PARTY
          RELATING TO THIS AGREEMENT OR THE OFFERINGS MUST BE BROUGHT WITHIN 18
          MONTHS AFTER THE CLAIM ARISES, OR ANY SHORTER PERIOD SPECIFIED BY
          APPLICABLE LAW.
        </li>
        <li className={classes.li}>
          <b>Confidentiality.</b> For purposes of this Agreement, “Confidential
          Information” means the Technology, including the Platform and Moove
          Data, and all documentation, information, data, and materials relating
          to, downloaded from, or otherwise obtained from the Platform,
          regardless of the form thereof, including all copies and extracts
          thereof. You will not disclose Confidential Information to any third
          party without Moove’s prior written consent. You may disclose the
          Confidential Information only to your employees who have a need to
          know the Confidential Information for purposes of your valid use of
          the Offerings as permitted under this Agreement and who are bound by
          an obligation of confidentiality at least as protective of the
          Confidential Information as this Agreement. You will treat all
          Confidential Information with the same degree of care as you treat
          your own confidential information, which, in no event, will be less
          than reasonable care. You will not utilize the Confidential
          Information other than as expressly permitted in this Agreement.
        </li>
        <li className={classes.li}>
          <b>Export Controls.</b> The Offerings may be subject to U.S. export
          control Laws and may be subject to export or import regulations in
          other countries. You agree to strictly comply with all such Laws and
          acknowledge that You have the responsibility to obtain such licenses
          to export, re-export, or import as may be required.
        </li>
        <li className={classes.li}>
          <b>Dispute Resolution.</b> The parties will attempt to resolve all
          disputes, controversies, or claims arising under, out of, or relating
          to this Agreement, including the formation, validity, binding effect,
          interpretation, performance, breach or termination, of this Agreement
          and the arbitrability of the issues submitted to arbitration hereunder
          and non-contractual claims relating to this Agreement (each, a
          “Dispute”) through discussion between the parties. Except as otherwise
          provided in Section 19 (Injunctive Relief), if any Dispute cannot be
          resolved through negotiations between the parties within 30 days of
          notice from one party to the other of the Dispute, either party may
          submit such Dispute for final settlement through binding arbitration
          under the arbitration rules of the American Arbitration Association
          then in effect (the “Rules”). Either party may commence the
          arbitration by delivering a request for arbitration as specified in
          the Rules. The arbitration will be conducted before a sole neutral
          arbitrator selected by agreement of the parties. If the parties cannot
          agree on the appointment of a single arbitrator within 30 days after
          either party to this Agreement delivers a request for arbitration, a
          neutral arbitrator will be selected as provided in the Rules. The
          arbitration will be conducted in the English language at a site
          specified by Moove in Denver, Colorado. The arbitrator will apply the
          law set forth in Section 18 (Choice of Laws; Venue) to any such
          arbitration and shall have the power to award any remedy available at
          law or in equity; provided, however, that the arbitrator shall have no
          jurisdiction to amend this Agreement or grant any relief not permitted
          herein or beyond the relief permitted herein. The award of the
          arbitrator will be the exclusive remedy of the parties for all claims,
          counterclaims, issues or accountings presented or plead to the
          arbitrator. The award of the arbitrator may not require payment of the
          costs, fees and expenses incurred by the prevailing party in any such
          arbitration by the non-prevailing party. Judgment upon the award may
          be entered in any court or governmental body having jurisdiction
          thereof. Any additional costs, fees or expenses incurred in enforcing
          the award may be charged against the party that resists its
          enforcement.
        </li>
        <li className={classes.li}>
          <b>Choice of Laws; Venue.</b> This Agreement will be governed by the
          laws of the State of Colorado (USA), without regard to conflicts of
          law principles thereof. The federal and state courts located in
          Denver, Colorado (USA) will have sole and exclusive jurisdiction over
          any disputes arising hereunder and the parties hereby irrevocably
          submit to the personal jurisdiction of such courts. The parties
          expressly waive any applications of the U.N. Convention on Contracts
          for the International Sale of Goods with respect to the performance or
          interpretations of this Agreement.
        </li>
        <li className={classes.li}>
          <b>Injunctive Relief.</b> Without prejudice to the parties’ right to
          proceed with arbitration, nothing in this Agreement will limit either
          party’s right to seek immediate injunctive or other equitable relief
          in any court of competent jurisdiction. Each party acknowledges and
          agrees that due to the unique nature of the Technology and the IPR
          relating thereto, there can be no adequate remedy at law for any
          breach by You of Your obligations hereunder, that any such breach may
          allow You or third parties to unfairly compete with Moove resulting in
          irreparable harm, and therefore, that upon any such breach of this
          Agreement or threat thereof, You will not oppose any attempt by Moove
          to obtain, in addition to whatever remedies it may have at law, an
          injunction or other appropriate equitable relief without making any
          additional showing of irreparable harm (and agrees to support the
          waiver of any requirement that Moove be required to post a bond prior
          to the issuance of any such injunction or other appropriate equitable
          relief).
        </li>
        <li className={classes.li}>
          <b>Notice.</b> Unless otherwise specified in this Agreement, any
          notices required or allowed under this Agreement will be provided to
          Moove by postal mail to the address for Moove listed on the Platform
          and Moove’s website. Moove may provide You with any notices required
          or allowed under this Agreement by sending You an email to any email
          address You provide to Moove in connection with Your Account, provided
          that in the case of any notice applicable both to You and other users
          of Platform, Moove may instead provide such notice by posting on
          Platform. Notices provided to Moove will be deemed given when actually
          received by Moove. Notice provided to You will be deemed given 24
          hours after posting to Platform or sending via e-mail, unless (as to
          e-mail) the sending party is notified that the e-mail address is
          invalid.
        </li>
        <li className={classes.li}>
          <b>Modifications.</b> Moove reserves the right, at any time, to modify
          the Platform, Moove Data or any other Offering, as well as the terms
          of this Agreement, whether by making those modifications available on
          the Platform or by providing notice to You as specified in this
          Agreement. Any modifications will be effective upon posting to the
          Platform or delivery of such other notice. You may cease using any
          Offering or terminate this Agreement at any time if you do not agree
          to any modification. However, You will be deemed to have agreed to any
          and all modifications through Your continued use of the Offerings
          following such notice.
        </li>
        <li className={classes.li}>
          <b>Additional Terms.</b> This Agreement represents the entire
          understanding and agreement between the parties with respect to the
          subject matter of this Agreement and supersedes any and all oral or
          written agreements or understandings, whether written or verbal,
          between the parties as to the subject matter of the Agreement. Except
          as noted herein, this Agreement may be amended or changed only by a
          writing signed by both parties. You may not assign, transfer or
          delegate, in whole or in part, whether by assignment, sale, merger,
          reorganization, operation of law, or otherwise, this Agreement or any
          of Your rights or obligations under this Agreement, to any third party
          without the prior written consent of Moove. Any assignment in
          violation of the foregoing will be null and void. The waiver of a
          breach of any provision of this Agreement will not operate or be
          interpreted as a waiver of any other or subsequent breach. The parties
          are independent contractors, and nothing in this Agreement will be
          construed as creating an employer-employee relationship, a
          partnership, or a joint venture between the parties. Neither party is
          an agent of the other and neither party is authorized to make any
          representation, contract, or commitment on behalf of the other party.
          Each and every right and remedy hereunder is cumulative with each and
          every other right and remedy herein or in any other agreement between
          the parties or under applicable Law. If any provision of this
          Agreement is held by an arbitrator or a court of competent
          jurisdiction to be unenforceable, such provision will be changed and
          interpreted to accomplish the objectives of such provision to the
          greatest extent possible under applicable law and the remaining
          provisions of this Agreement will continue in full force and effect.
          No term of this Agreement will be construed to confer any third-party
          beneficiary rights on any non-party. Neither party will not be liable
          for any failure to perform under this Agreement, to the extent that
          such party’s failure results from causes beyond such party’s
          reasonable control. The words “include,” “includes” and “including”
          will mean “include,” “includes,” or “including,” in each case,
          “without limitation.” This Agreement may be executed simultaneously in
          one or more counterparts (including by facsimile or electronic .pdf
          submission), each of which when executed will be deemed to be an
          original, but all of which will constitute one and the same agreement.
        </li>
      </ol>
    </>
  );
};

export default TermsContent;
