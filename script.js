var ezcommRevMemEligWidget = window.document.ezcommReviewMemberEligibilityWidget ? window.document.ezcommReviewMemberEligibilityWidget : {};


$(document).ready(function() {

    var householdIdReviews = getAttributeValue("pyWorkPage", "MemberID");

    // Obtain iframe ID of active tab
    var activeTier1IframeId = window.parent.$('div[id^="PegaWebGadget"]').filter(
        function() {
            return this.id.match(/\d$/);
        }).filter(function() {
        return $(this).attr('aria-hidden') == "false"
    }).contents()[0].id;
    var householdIdReviews;

    householdIdReviews = window.parent.$('iframe[id=' + activeTier1IframeId + ']')[0].contentWindow.getAttributeValue("pyWorkPage", "MemberID");

    var ezcommButtonVar = setInterval(addEzcommCoreLauncherButton, 2000);

    window.parent.openEzcommApp = function() {

        console.log(householdIdReviews)

        var member_data = JSON.parse(window.parent.sessionStorage.getItem("member_info"));
        ezcommRevMemEligWidget.data = {};
        //member
        ezcommRevMemEligWidget.data.member = {};
        ezcommRevMemEligWidget.data.member.version = "2.0";
        ezcommRevMemEligWidget.data.member.firstName = member_data.member_first_name;
        ezcommRevMemEligWidget.data.member.lastName = member_data.member_last_name;
        ezcommRevMemEligWidget.data.member.subscriberId = member_data.member_id.split('-')[0];

        ezcommRevMemEligWidget.data.member.idTypeCode = "20202";
        ezcommRevMemEligWidget.data.member.policyId = "0";
        ezcommRevMemEligWidget.data.member.encryptedFlag = false;
        ezcommRevMemEligWidget.data.member.dateOfBirth = window.parent.$("label[for='MemberDob']").next().children().html();
        ezcommRevMemEligWidget.data.member.additionalIdentifiers = [{
            id: householdIdReviews,
            type: "GPSHID"
        }];

        //request_metadata
        ezcommRevMemEligWidget.data.request_metadata = {};
        ezcommRevMemEligWidget.data.request_metadata.agentId = pega.d.pyUID;
        ezcommRevMemEligWidget.data.request_metadata.applicationName = "MAESTRO-EZCOMM";
        ezcommRevMemEligWidget.data.request_metadata.lineOfBusiness = "M&R";

       /* 
        var epmplookupcovid = {};
        epmplookupcovid.enable_email = true;
        epmplookupcovid.enable_sms = true;
        epmplookupcovid.enable_fax = false;
        ezcommRevMemEligWidget.data.request_metadata.enable_epmp_lookup = epmplookupcovid;
        */
        
         
        // for future updates
        var epmpObj = {};
        epmpObj.enabled = true;
        epmpObj.retrieveAllStatus = false; //set false for now
        epmpObj.allowUpdate = false;
        ezcommRevMemEligWidget.data.request_metadata.epmp = epmpObj;
        

        var contact_info_setobjCovid = {};
        contact_info_setobjCovid.enable_email = true;
        contact_info_setobjCovid.enable_sms = true;
        contact_info_setobjCovid.enable_fax = false;
        ezcommRevMemEligWidget.data.request_metadata.contact_info_settings = contact_info_setobjCovid;

        //Widget
        ezcommRevMemEligWidget.data.request_metadata.widget = {};
        ezcommRevMemEligWidget.data.request_metadata.widget.name = "MAESTRO-COVID19";
        ezcommRevMemEligWidget.data.request_metadata.widget.uuid = "4566-5446-4344-3454";

        //plugins
        var pluginObject = [];
        var plugin = {};
        plugin.pluginId = 5;
        plugin.name = "M&R";
        plugin.defaultCampaign = "COVID19 Resources";
        pluginObject.push(plugin);
        ezcommRevMemEligWidget.data.request_metadata.plugins = pluginObject;

        localStorage.setItem('EzcommCommunicationsPayload', JSON.stringify(ezcommRevMemEligWidget));

        window.open("/a4me/ezcomm-core-v2/", "a4meEZCommWindow", 'location=no,height=600,width=1000,scrollbars=1').focus();

    };


    function addEzcommCoreLauncherButton() {
        if(window.parent.$('iframe[id=' + activeTier1IframeId + ']').contents().find("span:contains('Contract Number')").length > 0 &&
            window.parent.$('iframe[id=' + activeTier1IframeId + ']').contents().find("#ezcommLauncherButton").length === 0){
            window.parent.$('iframe[id=' + activeTier1IframeId + ']').contents().find("label:contains('Quoted Benefits Notes')").parent().parent().prepend(
                '<button id="ezcommLauncherButton" onclick="window.parent.openEzcommApp()" type="button" class="pzhc"  ><div class="pzbtn-rnd" ><div class="pzbtn-lft"><div class="pzbtn-rgt" ><div class="pzbtn-mid" ><img src="webwb/zblankimage.gif" alt="" class="pzbtn-i" onclick="openEzcommApp()">EZComm</div></div></div></div></button>');

        }
    }
});
