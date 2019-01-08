jQuery(document).ready(function($) {
    'use strict';


    /**
     * Script for switch option
     */
    $('.switch_options').each(function() {
        //This object
        var obj = $(this);

        var switchPart = obj.children('.switch_part').attr('data-switch');
        var input = obj.children('input'); //cache the element where we must set the value
        var input_val = obj.children('input').val(); //cache the element where we must set the value

        obj.children('.switch_part.' + input_val).addClass('selected');
        obj.children('.switch_part').on('click', function() {
            var switchVal = $(this).attr('data-switch');
            obj.children('.switch_part').removeClass('selected');
            $(this).addClass('selected');
            $(input).val(switchVal).change(); //Finally change the value to 1
        });

    });
    /**
     * Script for widget switch option
     */
    $('body').on('click', '.widget_switch_part', function() {
        $(this).trigger('change');
        $(this).parent().find('.widget_switch_part').removeClass('selected');
        $(this).addClass('selected');
        var switch_val = $(this).data('switch');
        $(this).parent().find('input[type="hidden"]').val(switch_val);
    });

    $(document).on('click', '.wp-picker-container button', function() {
        $(this).$('.button[name="savewidget"]').prop('disabled', false);
    });

    /**
     * Widget tab wrapper control
     */
    $(document).on('widget-updated', function() {
        $('.widget-tabs-wrapper').each(function() {
            var vThis = $(this);
            var activeTab = vThis.children('li.active').attr('data-tab');
            vThis.siblings('.section-wrapper.' + activeTab).show();
        });
    });

    $('.widget-tabs-wrapper').each(function() {
        var vThis = $(this);
        var activeTab = vThis.children('li.active').attr('data-tab');
        vThis.siblings('.section-wrapper.' + activeTab).show();
    });

    $('body').on('click', '.widget-tab-control', function() {
        var tab_val = $(this).attr('data-tab');
        $(this).parent().find('.widget-tab-control').removeClass('active');
        $(this).addClass('active');
        $(this).parents('.widget-content').find('.section-wrapper').hide();
        $(this).parents('.widget-content').find('.section-wrapper.' + tab_val).fadeIn();
    });

    $('body').on('click', '.widget-content .seperator', function() {
        $('.banner-field').slideUp();
        $('.seperator').removeClass('arrow-up');
        $(this).toggleClass('arrow-up');
        $(this).siblings('.banner-field').slideToggle();
    });

    // function about post format
    function postFormat() {
        var cur_format = jQuery("input[type='radio'].post-format:checked").val();
        jQuery('.format-type-field').hide();
        if (cur_format === '0') {
            jQuery('#format-standard').fadeIn();
        } else {
            jQuery('#format-' + cur_format).fadeIn();
        }
    }
    /**
     * Change the post format
     */
    postFormat();
    $('input[name="post_format"]').change(function () {
        postFormat();
    });

    /**
     * Reset video embed value
     */
    $('#reset-video-embed').click(function () {
        $('input[name="post_embed_video_url"]').val('');
    });

    /**
     * Reset audio embed value
     */
    $('#reset-audio-embed').click(function () {
        $('input[name="post_embed_audio_url"]').val('');
    });

    /**
     * Add audio file
     */
    $('#post_audio_upload_button').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        var audio = wp.media.frames.file_frame = wp.media({
            title: 'Upload Audio File',
            button: {
                text: 'Use this file',
            },
            // multiple: true if you want to upload multiple files at once
            multiple: false,
            library: {
                type: 'audio'
            }
        }).open()
                .on('select', function (e) {
                    // This will return the selected audio from the Media Uploader, the result is an object
                    var uploaded_audio = audio.state().get('selection').first();
                    // We convert uploaded_audio to a JSON object to make accessing it easier
                    // Output to the console uploaded_audio
                    var audio_url = uploaded_audio.toJSON().url;
                    // Let's assign the url value to the input field
                    $this.prev('input').val(audio_url);
                });
        //$('#audiourl_remove').show();
    });

    $('#audiourl_remove').click(function () {
        $('input[name="post_embed_audiourl"]').val('');
    });

    /**
     * Add gallery images
     */
    $(document).on('click', '#post_gallery_upload_button', function (e) {
        var img_count = $('#post_image_count').val();
        var dis = $(this);
        var send_attachment_bkp = wp.media.editor.send.attachment;
        var _custom_media = true;
        wp.media.editor.send.attachment = function (props, attachment) {
            if (_custom_media) {
                var img = attachment.sizes.thumbnail.url;
                $('.post-gallery-section').append('<div class="gal-img-block"><div class="gal-img"><img src="' + img + '" height="150px" width="150px"/><span class="fig-remove" title="remove"></span></div><input type="hidden" name="post_images[' + img_count + ']" class="hidden-media-gallery" value="' + attachment.url + '" /></div>');
                img_count++;
                $('#post_image_count').val(img_count);
            } else {
                return _orig_send_attachment.apply(this, [props, attachment]);
            }
            ;
        }

        wp.media.editor.open($(this));
        return false;
    });
    $(document).on('click', '.fig-remove', function (e) {
        $(this).closest('.gal-img-block').remove();
    });


    // Page Metabox section
    var curTab = $('.ultra-page-meta-tabs li.active').attr('atr');
    $('.pg-metabox').find('#' + curTab).show();

    $('ul.ultra-page-meta-tabs li').click(function () {
        var id = $(this).attr('atr');

        $('ul.ultra-page-meta-tabs li').removeClass('active');
        $(this).addClass('active')

        $('.pg-metabox .pg-metabox-inside').hide();
        $('#' + id).fadeIn();
        $('#post-meta-selected').val(id);
    });

    /**
     * Script for image selected from radio option
     */
    $('#ultra-img-container-meta li img').click(function () {
        $('#ultra-img-container-meta li').each(function () {
            $(this).find('img').removeClass('ultra-radio-img-selected');
        });
        $(this).addClass('ultra-radio-img-selected');
    });

    /* Post Type Dependency */
    $('.section-wrapper').each(function(){
        var dis = $(this);
        dis.find('.ultra-radio.post-type input').on('click',function(){
           var val = $(this).val();
           if(val=='category'){
             dis.find('.category-choose').show();
           }else{
             dis.find('.category-choose').hide();
           }
        });
    });
    //on load
    $('.section-wrapper').each(function(){
        var dis = $(this);
        var val = dis.find('.ultra-radio.post-type input:checked').val();
       if(val=='category'){
         dis.find('.category-choose').show();
       }else{
         dis.find('.category-choose').hide();
       }
    });

});