import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import moment from 'moment';

// Providers
import { RecipesProvider } from '../../providers/recipes/recipes';

// Models
import { Week } from '../../models/.';

@Component({
  selector: 'page-week',
  templateUrl: 'week.html',
})
export class WeekPage {

  week: Week = new Week;
  from: Date;
  until: Date;

  constructor(private navCtrl: NavController, private recipesProvider: RecipesProvider) {
  }

  ionViewDidEnter() {
    this.getWeek();
  }

  private getWeek(){
    this.recipesProvider.getWeek(moment().isoWeek())
      .then((res) => {
        console.log(res);
        if(res != undefined){
          this.week = res;
          this.from = new Date(moment().week(this.week.calendarWeek).startOf('isoWeek').format());
          this.until = new Date(moment().week(this.week.calendarWeek).endOf('isoWeek').format());
        }
      })
      .catch(err => console.log(err));
  }

}
