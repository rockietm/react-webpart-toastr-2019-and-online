import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';


import { SPComponentLoader } from '@microsoft/sp-loader';

// toastr
import * as toastr from 'toastr';

// Import button component
import { IButtonProps, DefaultButton } from 'office-ui-fabric-react/lib/Button';


export default class HelloWorld extends React.Component < IHelloWorldProps, {} > {

  protected showNotifications(): void {

    console.log("Show notifications..");

    toastr.info("Lorem ipsum dolor sit amet, consectetur adipiscing elit", "Header message");
    toastr.success("Lorem ipsum dolor sit amet, consectetur adipiscing elit", "Header message");
    toastr.warning("Lorem ipsum dolor sit amet, consectetur adipiscing elit", "Header message");
    toastr.error("Lorem ipsum dolor sit amet, consectetur adipiscing elit", "Header message");

  }

  protected init(): void {

      // Load the Toastr CSS
      SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css');


      //***********************
      //Toastr Options
      //***********************

      //Determines where the toast shows up.
      // styles.topRight and styles.topLeft take into account the SuiteBar
      // there are also the native toast-bottom-right and toast-bottom-left
      toastr.options.positionClass = `${styles.topRight} ${styles.helloWorld}`;

      toastr.options.preventDuplicates = false;   // Prevent duplicates to FALSE

      toastr.options.newestOnTop = false; //Ensures the first toast we send is on top
      toastr.options.timeOut = 0; //Prevents auto dismissal
      toastr.options.extendedTimeOut = 0; //Prevents auto dismissal during hover
      toastr.options.tapToDismiss = true; //Allows messages to go away on click
      toastr.options.closeButton = true; //Shows a close button to let end users know to click to close

      //A combination of Office UI-Fabric classes and custom classes are used
      // to ensure the notifications don't look too out of place
      //We use a custom styles.fabricIcon style to imitage the ms-Icon class
      // the ms-Icon class has extra properties that mess up our toast
      //We are unable to use the ms-bgColor styles since the Toast CSS loads
      // later and takes precedence, so we use our own color classes
      // For more background on this issue, see this article: https://dev.office.com/sharepoint/docs/spfx/web-parts/guidance/office-ui-fabric-integration


      /* Replaced UI Fabric with base64 converted icons: */

      // toastr.options.titleClass = 'ms-font-m ms-fontWeight-semibold';
      // toastr.options.messageClass = 'ms-font-s';
      // toastr.options.iconClasses = {
      //   info: `${styles.info} ${styles.fabricIcon} ms-Icon--Info`,
      //   warning: `${styles.warning} ${styles.fabricIcon} ms-Icon--Warning`,
      //   error: `${styles.error} ${styles.fabricIcon} ms-Icon--Error`,
      //   success: `${styles.success} ${styles.fabricIcon} ms-Icon--Completed`
      // };

      toastr.options.titleClass = 'my-toast-title';
      toastr.options.messageClass = 'my-toast-message';

      toastr.options.iconClasses = {
        info: `${styles.info} my-toast-info`,
        warning: `${styles.warning} my-toast-warning`,
        error: `${styles.error} my-toast-error`,
        success: `${styles.success} my-toast-success`
      };

  }

  public render(): React.ReactElement<IHelloWorldProps> {

    // init toastr
    this.init();

    return(
      <div className = { styles.helloWorld } >
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{escape(this.props.description)}</p>

                  <DefaultButton
                    className={styles.button}
                    data-automation-id="someFunction"
                    title="Show toastr"
                    onClick={this.showNotifications}>
                    Test Notifications
                  </DefaultButton>

            </div>
          </div>
        </div>
      </div >
    );
  }
}
