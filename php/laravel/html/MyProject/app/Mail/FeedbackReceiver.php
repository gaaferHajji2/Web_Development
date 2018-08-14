<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class FeedbackReceiver extends Mailable
{
    use Queueable, SerializesModels;

	public $name;
	public $comment;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($name, $comment)
    {
        //initialize the variables.
	$this->name= $name;
	$this->comment= $comment;
    }

    /**
     * Build the message.
     * Configuring the Sender
	First, we need to configure who the email is going to be “from”. We do that by setting the from method inside the build method of 
	the FeedbackReceived class.

	You can change the from field to anything you want or which represents your business.
     * @return $this
     */
    public function build()
    {
        //return $this->view('view.name');
	return $this->from('gaafer@company.com')->view('emails.contact');//for the view we will create new folder: emails and create new file: contact.
    }
}
