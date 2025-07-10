import { UserStore } from "./user.store"
import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";

describe('User Store Testing', ()=>{
    let userStore;
    beforeEach(()=>{
        TestBed.configureTestingModule({
            providers:[UserStore, provideHttpClient()]
        });
    });
    userStore = TestBed.inject(UserStore)


    it('should be created', () => {
        expect(userStore).toBeTruthy()
    });
})