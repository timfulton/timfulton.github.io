$(document).on('ready', () => {
  // variables
  let totalElements = $('.video').size() + $('img').size() + $('#reel').size();
  let totalElementsLoaded = 0;

  // promises
  var imagesLoaded = $.Deferred();
  var videoLoaded = $.Deferred();
  var videoImagesLoaded = $.Deferred();

  var imagesLoadedPromise = imagesLoaded.promise();
  var videoLoadedPromise = videoLoaded.promise();
  var videoImagesLoadedPromise = videoImagesLoaded.promise();

  const video = document.getElementById("reel");

  // loaders
  video.oncanplay = () => {
    videoLoaded.resolve('true');
  }

  $('img').imagesLoaded((loaded) => {
    imagesLoaded.resolve('true');
  });

  $('.video').imagesLoaded({ background: true }, (loaded) => {
    videoImagesLoaded.resolve('true');
  });

  $.when(imagesLoadedPromise, videoLoadedPromise, videoImagesLoadedPromise).done(() => {
    video.currentTime = 0;
    video.play();
    $('#container').addClass('loaded-page');
    $('#loader').addClass('loading-page').addClass('hide');
    $('html, body').css({
      'overflow': 'auto',
      'height': 'auto'
    });
  });

  // manipulators
  $('.video').hover(function() {
    const hasVideoEmbed = $(this).attr('iframe');

    if (hasVideoEmbed) return null;

    $(this.children[0]).addClass('video-thumbnail-hover-effect');
    $(this.children[1]).addClass('video-description-display');
  }, function() {
    const hasVideoEmbed = $(this).attr('iframe');

    if (hasVideoEmbed) return null;

    $(this.children[0]).removeClass('video-thumbnail-hover-effect');
    $(this.children[1]).removeClass('video-description-display');
  });

  $('.video').click(function() {
    const dataType = $(this).attr('data-type');
    const dataId = $(this).attr('data-id');

    $(this).attr('iframe', true);

    let embed;

    switch (dataType) {
      case 'vimeo':
        embed = (
          '<iframe src="https://player.vimeo.com/video/' + dataId + '" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
        );
        break;
      case 'youtube':
      default:
        embed = (
          '<iframe id="ytplayer" type="text/html" width="100%" height="100%" src="https://www.youtube.com/embed/' + dataId + '"frameborder="0"></iframe>'
        );
        break;
    }

    $(this).html(embed);
  });
});
