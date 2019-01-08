<?php
/**
 * The template for displaying the footer.
 *
 * @package Pasal-ecommerce
 * @since Pasal Ecommerce 1.0
 */
$pasal_ecommerce_settings = pasal_ecommerce_get_theme_options();
?>
<footer>
    <?php
    if (in_array('layout-pro/layout-pro.php', apply_filters('active_plugins', get_option('active_plugins')))) {
        echo do_shortcode('[lp_footer_widget]');
    } 
    ?>
    <div class="botfooter">
        <div class="container">
            <div class="row">
                <?php
                if (in_array('layout-pro/layout-pro.php', apply_filters('active_plugins', get_option('active_plugins')))) {
                    echo do_shortcode('[lp_footer_replace]');
                } else {
                    echo '<div class="col-md-12">';
                    echo '<div class="copyright">';
                    echo esc_html__('&copy; Copyright ', 'pasal-ecommerce');
                    echo '<a href="' . esc_url('https://codethemes.co/') . '" target="_blank">' . ' ' . esc_html__('Code Themes', 'pasal-ecommerce') . '</a>';
                    echo '&nbsp;' . esc_html('|', 'pasal-ecommerce') . '&nbsp;';
                    echo esc_html('All Rights Reserved', 'pasal-ecommerce');
                    echo '</div>';
                    echo '</div>';
                }
                ?>
            </div>
        </div>
    </div>
</footer>
</div>
<?php wp_footer(); ?>
</body>
</html>
