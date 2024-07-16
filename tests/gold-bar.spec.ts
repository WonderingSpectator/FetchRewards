import { test, expect } from '@playwright/test';

test('fake gold bar', async ({ page }) => {

  await page.goto('http://sdetchallenge.fetch.com/');
  //first weigh in will consist of three bars on both sides
  await page.locator('//div[@class="game-board"][1]/div/div[2]/input[1]').click();
  await page.keyboard.press('0');
  await page.keyboard.press('Tab');
  await page.keyboard.press('1');
  await page.keyboard.press('Tab');
  await page.keyboard.press('2');

  await page.locator('//div[@class="game-board"][2]/div/div[2]/input[1]').click();
  await page.keyboard.press('3');
  await page.keyboard.press('Tab');
  await page.keyboard.press('4');
  await page.keyboard.press('Tab');
  await page.keyboard.press('5');

  await page.getByRole('button', { name: /Weigh/i }).click();
  await page.waitForTimeout(2500);

  /*if the first weigh in are equal we need to reweigh the bars with the third set and eliminate the first set
  on the second weigh in if the right side is heavier we can check the first two bars on the left
  if both bars are equal in weight then we know the bar not on the sacle is the fake gold bar
  if the bar on the right is heavier then the bar on the right is the fake bar
  if the bar on the left is heavier then the bar on the left is the fake bar*/
  const result = page.locator('//div[@class="result"]/button'); 
   if(await result.textContent()=='='){
    await page.getByRole('button', { name: /Reset/i }).click();
    await page.locator('//div[@class="game-board"][1]/div/div[2]/input[1]').click();
    await page.keyboard.press('3');
    await page.keyboard.press('Tab');
    await page.keyboard.press('4');
    await page.keyboard.press('Tab');
    await page.keyboard.press('5');
    await page.locator('//div[@class="game-board"][2]/div/div[2]/input[1]').click();
    await page.keyboard.press('6');
    await page.keyboard.press('Tab');
    await page.keyboard.press('7');
    await page.keyboard.press('Tab');
    await page.keyboard.press('8');
    await page.getByRole('button', { name: /Weigh/i }).click();
    await page.waitForTimeout(2500);
    if(await result.textContent()=='<'){
    
      await page.getByRole('button', { name: /Reset/i }).click();
      await page.locator('//div[@class="game-board"][1]/div/div[2]/input[1]').click();
      await page.keyboard.press('3');
      await page.locator('//div[@class="game-board"][2]/div/div[2]/input[1]').click();
      await page.keyboard.press('4');
      await page.getByRole('button', { name: /Weigh/i }).click();
      await page.waitForTimeout(2500);
      if(await result.textContent()=='='){
        console.log('5 is the fake gold bar');
      }else if(await result.textContent()=='<'){
        console.log('3 is the fake gold bar');
      }else if(await result.textContent()=='>'){
        console.log('4 is the fake gold bar');
      }
    }
    else if(await result.textContent()=='>'){
      
      await page.getByRole('button', { name: /Reset/i }).click();
      await page.locator('//div[@class="game-board"][1]/div/div[2]/input[1]').click();
      await page.keyboard.press('6');
      await page.locator('//div[@class="game-board"][2]/div/div[2]/input[1]').click();
      await page.keyboard.press('7');
      await page.getByRole('button', { name: /Weigh/i }).click();
      await page.waitForTimeout(2500);
      if(await result.textContent()=='='){
        console.log('8 is the fake gold bar');
      }else if(await result.textContent()=='<'){
        console.log('6 is the fake gold bar');
      }else if(await result.textContent()=='>'){
        console.log('7 is the fake gold bar');
      }
    }
    
  
   }
   /*On the first weigh in if the right side is heavier we can check the first two bars on the left
   if both bars are equal in weight then we know the bar not on the sacle is the fake gold bar
   if the bar on the right is heavier then the bar on the right is the fake bar
   if the bar on the left is heavier then the bar on the left is the fake bar
   */
   else if(await result.textContent()=='<'){
  
    await page.getByRole('button', { name: /Reset/i }).click();
    await page.locator('//div[@class="game-board"][1]/div/div[2]/input[1]').click();
    await page.keyboard.press('0');
    await page.locator('//div[@class="game-board"][2]/div/div[2]/input[1]').click();
    await page.keyboard.press('1');
    await page.getByRole('button', { name: /Weigh/i }).click();
    await page.waitForTimeout(2500);
    if(await result.textContent()=='='){
      console.log('2 is the fake gold bar');
    }else if(await result.textContent()=='<'){
      console.log('0 is the fake gold bar');
    }else if(await result.textContent()=='>'){
      console.log('1 is the fake gold bar');
    }

   }
   /*On the first weigh in if the left side is heavier we can check the first two bars on the right
   if both bars are equal in weight then we know the bar not on the sacle is the fake gold bar
   if the bar on the right is heavier then the bar on the right is the fake bar
   if the bar on the left is heavier then the bar on the left is the fake bar
   */
   else if(await result.textContent()=='>'){
    
    await page.getByRole('button', { name: /Reset/i }).click();
    await page.locator('//div[@class="game-board"][1]/div/div[2]/input[1]').click();
    await page.keyboard.press('3');
    await page.locator('//div[@class="game-board"][2]/div/div[2]/input[1]').click();
    await page.keyboard.press('4');
    await page.getByRole('button', { name: /Weigh/i }).click();
    await page.waitForTimeout(2500);
    if(await result.textContent()=='='){
      console.log('5 is the fake gold bar');
    }else if(await result.textContent()=='<'){
      console.log('3 is the fake gold bar');
    }else if(await result.textContent()=='>'){
      console.log('4 is the fake gold bar');
    }
   }
  

});


test('fake gold bar with for loops', async ({ page }) => {
  await page.goto('http://sdetchallenge.fetch.com/');
  const cellsL = page.locator('//div[@class="game-board"][1]/div/div/input[@class="square"]');
  const cellsR = page.locator('//div[@class="game-board"][2]/div/div/input[@class="square"]');
  const result = page.locator('//div[@class="result"]/button'); 
  for(let l =0; l < 3; l++){
    await cellsL.nth(l).fill(String(l));
  }
  for(let r =3; r < 6; r++){
    await cellsR.nth(r).fill(String(r));  
  }
  await page.getByRole('button', { name: /Weigh/i }).click();
  await page.waitForTimeout(2500);

  if(await result.textContent()=='='){
    await page.getByRole('button', { name: /Reset/i }).click();
    for(let l =3; l < 6; l++){
      await cellsL.nth(l).fill(String(l));  
    }
    for(let r =6; r < 9; r++){
      await cellsR.nth(r).fill(String(r));  
    }

    await page.getByRole('button', { name: /Weigh/i }).click();
    await page.waitForTimeout(2500);
    if(await result.textContent()=='<'){
      await page.getByRole('button', { name: /Reset/i }).click();
      await cellsL.nth(0).fill('3');  
      await cellsR.nth(0).fill('4');
      await page.getByRole('button', { name: /Weigh/i }).click();
      await page.waitForTimeout(2500);
    
      if(await result.textContent()=='='){
        console.log('5 is the fake gold bar');
      }else if(await result.textContent()=='<'){
        console.log('3 is the fake gold bar');
      }else if(await result.textContent()=='>'){
        console.log('4 is the fake gold bar');
      }  
    }else if(await result.textContent()=='>'){
      await page.getByRole('button', { name: /Reset/i }).click();
      await cellsL.nth(0).fill('6');  
      await cellsR.nth(0).fill('7');
      await page.getByRole('button', { name: /Weigh/i }).click();
      await page.waitForTimeout(2500);

      if(await result.textContent()=='='){
        console.log('8 is the fake gold bar');
      }else if(await result.textContent()=='<'){
        console.log('6 is the fake gold bar');
      }else if(await result.textContent()=='>'){
        console.log('7 is the fake gold bar');
      }
    }
  

    
  }

  else if(await result.textContent()=='<'){
    await page.getByRole('button', { name: /Reset/i }).click();
    await cellsL.nth(0).fill('0');  
    await cellsR.nth(0).fill('1');
    await page.getByRole('button', { name: /Weigh/i }).click();
    await page.waitForTimeout(2500);
  
    if(await result.textContent()=='='){
      console.log('2 is the fake gold bar');
    }else if(await result.textContent()=='<'){
      console.log('0 is the fake gold bar');
    }else if(await result.textContent()=='>'){
      console.log('1 is the fake gold bar');
    }  
  
  }

  else if(await result.textContent()=='>'){
    await page.getByRole('button', { name: /Reset/i }).click();
    await cellsL.nth(0).fill('3');  
    await cellsR.nth(0).fill('4');
    await page.getByRole('button', { name: /Weigh/i }).click();
    await page.waitForTimeout(2500);
  
    if(await result.textContent()=='='){
      console.log('5 is the fake gold bar');
    }else if(await result.textContent()=='<'){
      console.log('3 is the fake gold bar');
    }else if(await result.textContent()=='>'){
      console.log('4 is the fake gold bar');
    }  
  }

});