var myApp = angular.module('myApp', ['ui.router', 'ngAnimate']);

myApp.config(function($stateProvider, $urlRouterProvider, $locationProvider){
  console.log('inside of config block');

  $stateProvider
    
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html'
      })
      .state('become-member', {
        url: '/become-member',
        templateUrl: 'views/become-member.html'
      })
      .state('community', {
        url: '/community',
        templateUrl: 'views/community.html'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'views/contact.html'
      })
      .state('donate', {
        url: '/donate',
        templateUrl: 'views/donate.html'
      })
      .state('faces', {
        url: '/faces-of-our-members',
        templateUrl: 'views/faces.html'
      })
      .state('family', {
        url: '/family-involvement',
        templateUrl: 'views/family.html'
      })
      .state('faq', {
        url: '/faq',
        templateUrl: 'views/faq.html'
      })
      .state('member-app', {
        url: '/member-application',
        templateUrl: 'views/member-app.html'
      })
      .state('member-programs', {
        url: '/member-programs',
        templateUrl: 'views/member-programs.html'
      })
      .state('news', {
        url: '/news',
        templateUrl: 'views/news.html'
      })
      .state('non-rider-member', {
        url: '/non-rider-member',
        templateUrl: 'views/non-rider-member.html'
      })
      .state('organization', {
        url: '/organization',
        templateUrl: 'views/organization.html'
      })
      .state('pay-online', {
        url: '/pay-online',
        templateUrl: 'views/pay-online.html'
      })
      .state('rider-stories', {
        url: '/rider-stories',
        templateUrl: 'views/rider-stories.html'
      })
      .state('what-we-do', {
        url: '/what-we-do',
        templateUrl: 'views/what-we-do.html'
      })
      .state('corporate', {
        url: '/corporate',
        templateUrl: 'views/corporate.html'
      })
      .state('volunteer-to-drive', {
        url: '/volunteer-to-drive',
        templateUrl: 'views/volunteer-to-drive.html'
      })
      .state('volunteer-app', {
        url: '/volunteer-app',
        templateUrl: 'views/volunteer-app.html'
            // resolve: {
            //     formData: function ($scope) {
            //         $scope.formData = {};
            //     },
            //   }
      })
      .state('newsletters', {
        url: '/newsletters',
        templateUrl: 'views/newsletters.html',
        params: {
          anchor: null
        }
      })
      .state('add-pta-credit', {
        url: '/add-pta-credit',
        templateUrl: 'views/add-pta-credit.html'
      })
      .state('services-map', {
        url: '/services-map',
        templateUrl: 'views/services-map.html'
      })
      .state('draft', {
        url: '/draft',
        templateUrl: 'views/draft.html'
      })

  // default fall back route
  $urlRouterProvider.otherwise('/');

  // enable HTML5 Mode for SEO
  // $locationProvider.html5Mode(true);
  // $locationProvider.html5mode({ enabled: true, requireBase: false });
})



  myApp.run(['$rootScope', '$location', '$window',
    function($rootScope, $location, $window) {
      $rootScope.$on('$routeChangeSuccess',
        function(event) {
          if (!$window.ga) {
            return;
          }
          $window.ga('send', 'pageview', {
            page: $location.path()
          });
        });
    }
  ]);



myApp.controller('MainController', ['$scope', '$transitions','$http', '$anchorScroll', '$location', '$stateParams', '$timeout', function ($scope, $transitions, $http, $anchorScroll, $location, $stateParams, $timeout)  {
  console.log('inside main controller');
  
  $scope.affiliate = "Bluegrass";
  $scope.zoomLevel = 1;
  $scope.tab = 1;
  $scope.formData = {};
  $scope.loading = false;
  $scope.minlength = 2;
  $scope.maxlength = 50;
  $scope.maxMsgLength = 2000;
  $scope.ssnPattern = new RegExp(/^\d{3}-?\d{2}-?\d{4}$/);
  $scope.zipPattern = new RegExp(/^\d{5}$/);
  $scope.emailPattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/);
  $scope.datePattern = new RegExp(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  $scope.dobPattern = new RegExp(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  $scope.phonePattern = new RegExp(/^\d{3}[- ]?\d{3}[- ]?\d{4}$/);
  $scope.errorMessages = {
    required: "This field is required",
    minlength: "This field needs to be at least 2 characters long",
    maxlength: "This field needs to be at most 30 characters long",
    phone: "Please match pattern [+91-036-78658 || 91-036-78658]",
    zip: "The zipcode should be be 5 digits long",
    email: "The email should have the format: test@example.com",
    emailConfirmation: "The email confirmation field should match the email field",
    date: "The date should have the format: MM/DD/YYYY",
    dob: "The date of birth should have the format: MM/DD/YYYY",
    phone: "The phone number should have the format: 111-111-1111",
    ssn: "The driver license number should have the format: 123-45-6789",
    mismatchName: "This value does not match the name you entered above",
    mismatchSignature: "This value does not match the name the signature you entered above",
    mismatchDate: "This value does not match the date you entered above"
  };
  $scope.dataPDF = null;
  $scope.formSubject = 'New application received';
  $scope.states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
  $scope.itnSources = ['Family','Friend','Speaker','Doctor','Radio','Television','Flier','Book','Phone','Agency on Aging', 'Social Worker','Internet','Referred by Current Member'];
  $scope.ratings = ['None',1,2,3,4,5,6];
  $scope.keyword = '';

  
  // $transitions.onStart({}, function($transition, $scope){
  //     console.log('changing state');
  //     $scope.formData = {};
  //     $scope.tab = 1;
  // });
  
  $scope.scrollTo = function(id) {
    var old = $location.hash();
    $location.hash(id);
    $anchorScroll();
    //reset to old to keep any additional routing logic from kicking in
    $location.hash(old);
  };
  
  $scope.catchAnchor = function(){
    console.log('stateparam is ', $stateParams, $stateParams.anchor);
    $scope.scrollTo($stateParams.anchor);
  }
  
  $scope.resetFormData = function(){
      $scope.formData = {};
      $scope.serverMessage = "";
      $scope.loading = false;
      $scope.tab = 1;
    }

  $scope.nextTabMemberApp = function(prev){
    $(window).scrollTop(50);
    if (prev) {
      $scope.tab -= 1;
    } else {
      $scope.tab += 1;
    }
  }
  
  $scope.scrollToTop = function(){
    $(window).scrollTop(50);
  }
  
  $scope.readMore = function(divId) {
    var content = document.getElementById(divId);
    if (content.style.display === "none") {
        content.style.display = "block";
        content.nextElementSibling.nextElementSibling.nextElementSibling.innerText = "READ LESS";
    } else {
        content.style.display = "none";
        content.nextElementSibling.nextElementSibling.nextElementSibling.innerText = "READ MORE";
    }
  }
  
  $scope.zoom = function(direction) {
    if (direction == 'more') {
      $scope.zoomLevel += 1;
      var content = document.getElementByTagName(body);
      content.style.fontSize = $scope.zoomLevel + 'rem';
    }
    else if (direction == 'less') {
      $scope.zoomLevel -= 1;
    }
    
  }
  
  $scope.searchKeyword = function(){
    console.log("inside searchKeyword");
    var myHilitor = new Hilitor("wrapper-content");
    myHilitor.apply($scope.keyword);
    console.log('my hilitor', myHilitor);
  }
  
  $scope.animateValue = function(id, start, end, duration)  {
    var range = end - start;
    var current = start;
    var increment = end > start? 50 : -50;
    var stepTime = Math.abs(Math.floor(duration / range));
    var obj = document.getElementById(id);
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current >= end) {
            clearInterval(timer);
            obj.innerHTML = end;
        }
    }, stepTime);
  }


  $scope.submitForm = function(formType){
    console.log('submitForm, formData is', $scope.formData);
    $scope.loading = true;
    $http.post('/sendmail', {
      from: '"ITNBluegrass Web User" <donotreply@itnamerica.com>',
      to: 'itnamerica2018@gmail.com',
      subject: "ITNBluegrass Contact Form Submitted",
      text: $scope.formData,
      html: "<p><strong>Name:</strong>: " + $scope.formData.name + "</p>\n" +
      "<p><strong>Email:</strong>: " + $scope.formData.email + "</p>\n " +
      "<p><strong>Mobile:</strong>: " + $scope.formData.phone + "</p>\n " +
      "<p><strong>Subject:</strong>: " + $scope.formData.subject + "</p>\n " +
      "<p><strong>Message Body:</strong>: " + $scope.formData.messageBody + "</p>\n "
    }).then(function(res){
        $scope.loading = false;
        $scope.serverMessage = 'Your form was submitted successfully. You should hear back from us soon.';
    }).catch(function(err){
        $scope.loading = false;
        $scope.serverMessage = 'There was an error submitting your form. Please contact us by phone instead.';
    });
  }
  
  $scope.submitFormWithPDF = function(formType){
    console.log('submitForm PDF, formData is ', $scope.formData);
    $scope.loading = true;
    if (formType === 'volunteer') {
        $(document).ready(function(){
          $('#pdfVersion').css('display', 'block');
        })
        $scope.formSubject = 'ITNBluegrass - New volunteer application received';
        $scope.generateMultiPagePDF();
    } else if (formType === 'membership') {
        $(document).ready(function(){
          $('#pdfVersion').css('display', 'block');
        })
        $scope.showPdf = true;
        $scope.formSubject = 'ITNBluegrass - New membership application received';
        $scope.generateMultiPagePDF();
    } else if (formType === 'nonrider') {
        $scope.formSubject = 'ITNBluegrass - Non-Rider application Form submitted';
        $scope.generatePDF();
    } 
  }
  
  
  $scope.generatePDF = function() {
    console.log('inside pdf');
    kendo.drawing.drawDOM($("#formConfirmation"))
      .then(function (group) {
          return kendo.drawing.exportPDF(group, {
              paperSize: "auto",
              margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" }
          });
      })
      .done(function (data) {
        console.log('data is ', data);
        $scope.dataPDF = data;
        $http.post('/sendmail', {
          from: '"ITNBluegrass Web User" <donotreply@itnamerica.com>',
          to: 'itnamerica2018@gmail.com',
          subject: $scope.formSubject,
          text: $scope.formData,
          pdf: $scope.dataPDF
        }).then(function(res){
            $scope.loading = false;
            $scope.serverMessage = 'Your form was submitted successfully. You should hear back from us soon.';
        }).catch(function(err){
          $scope.loading = false;
          $scope.serverMessage = 'There was an error submitting your form. Please contact us, or consider submitting your form by paper instead.';
        });
      });
  }

  $scope.generateMultiPagePDF = function() {
    console.log('inside multipage');
    kendo.drawing.drawDOM($("#pdfVersion"), {
          paperSize: "A4",
          margin: { left: "3cm", top: "1cm", right: "1cm", bottom: "1cm" },
          template: $("#page-template").html()
      }).then(function (group) {
          return kendo.drawing.exportPDF(group);
      })
      .done(function (data) {
        console.log('data is ', data);
        $scope.dataPDF = data;
        $http.post('/sendmail', {
          from: '"ITNBluegrass Web User" <donotreply@itnamerica.com>',
          to: 'itnamerica2018@gmail.com',
          subject: $scope.formSubject,
          text: $scope.formData,
          pdf: $scope.dataPDF
        }).then(function(res){
            $scope.loading = false;
            $scope.serverMessage = 'Your form was submitted successfully. You should hear back from us soon.';
        }).catch(function(err){
          $scope.loading = false;
          $scope.serverMessage = 'There was an error submitting your form. Please contact us, or consider submitting your form by paper instead.';
        });
      });
  }
  
}]);


myApp.directive('match', function($parse) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      scope.$watch(function() {        
        return $parse(attrs.match)(scope) === ctrl.$modelValue;
      }, function(currentValue) {
        ctrl.$setValidity('mismatch', currentValue);
      });
    }
  };
});

myApp.filter('inputSelected', function(){
  return function(formData){
    var keyArr = [];
    var word = [];
    Object.keys(formData).forEach(function(key){
    if (formData[key]){
    	var keyCap = key.charAt(0).toUpperCase() + key.slice(1);
      for (var char = 0; char<keyCap.length; char++ ) {
      	if (keyCap[char] == keyCap[char].toUpperCase()){
          var spacedLetter = ' '+ keyCap[char];
          word.push(spacedLetter);
        }
        else {
          word.push(keyCap[char]);
        }
      }
    }
    keyArr.push(word.join(''))
    word = [];
    })
    return keyArr.toString();
  }
})

